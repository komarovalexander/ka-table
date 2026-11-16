import { createContext, FunctionComponent, SetStateAction, useCallback, useInsertionEffect, useRef, useState } from 'react';

import { ITableInstance, ITableProps } from '../Table/Table';
import { getCallbackProps, getControlledProps, getControlledPropsKeys, getPropsToOverride, withCallbacks } from './utils';

import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc, TableAction } from '../../types';
import { TableControlled } from '../TableControlled/TableControlled';
import { getTableAppliedProps, notifyTableChanged, setTableAppliedProps, setTableRendered } from '../../Utils/TableInstanceUtils';

import { getTable } from '../../hooks/UseTable';
import { kaReducer } from '../../Reducers/kaReducer';
import { useIsomorphicLayoutEffect } from '../../Utils/EffectUtils';

export interface ITableUncontrolledPropsKeys extends ITableProps {
    childComponents?: ChildComponents;
    table?: ITableInstance;
}

export const TableInstanceContext = createContext<ITableInstance>({} as ITableInstance);

export const TableUncontrolled: FunctionComponent<ITableUncontrolledPropsKeys> = (props) => {
    const { table: tableFromProps, childComponents, ...tablePropsControlled } = props;
    const [ownTable] = useState(() => getTable());
    const table = tableFromProps || ownTable;

    const [tableProps, setTableProps] = useState<ITableProps>(() => ({ ...tablePropsControlled, ...table.props }));
    // the latest state: several actions dispatched in a row are applied one after another before the next render
    const tablePropsRef = useRef(tableProps);
    // the functions are not the state of the table: the latest ones are used for rendering, by the reducer and in table.props
    const callbacks = getCallbackProps(props);
    const callbacksRef = useRef(callbacks);

    const changeProps = useCallback((value: SetStateAction<ITableProps>) => {
        tablePropsRef.current = typeof value === 'function' ? value(withCallbacks(tablePropsRef.current, callbacksRef.current)) : value;
        setTableProps(tablePropsRef.current);
    }, []);

    const dispatch: DispatchFunc = useCallback((action) => {
        // the state is calculated outside of the setState updater: React calls updaters twice in StrictMode
        const prevState = withCallbacks(tablePropsRef.current, callbacksRef.current);
        const nextStateDefault = kaReducer(prevState, action);
        // customReducer and onDispatch get the actions of the code which uses the table too: that code adds their types to the parameters
        const tableAction = action as TableAction;
        const nextState = table.customReducer?.(nextStateDefault, tableAction, prevState) ?? nextStateDefault;
        // prevState is a new object: the actions which don't change it (e.g. ComponentDidMount) don't render the table again
        if (nextState !== prevState) {
            changeProps(nextState);
        }
        setTimeout(() => {
            table.onDispatch?.(tableAction, nextState, prevState);
        }, 0);
    }, [table, changeProps]);

    // the props are applied when the parent component changes them, not on every render (see getControlledPropsKeys).
    // The instance keeps them: a table mounted again with the same instance applies the props changed meanwhile
    const [appliedProps, setAppliedProps] = useState<Partial<ITableProps>>(() => getTableAppliedProps(table) || props);
    const controlledPropsKeys = getControlledPropsKeys(props, appliedProps);
    const latestTableProps = tablePropsRef.current;
    const propsToOverride = getPropsToOverride(controlledPropsKeys, props, appliedProps, latestTableProps);
    if (Object.keys(propsToOverride).length) {
        // updating the state during rendering: React re-renders the component right away, before rendering children.
        // Only the state is updated: React drops it together with a render which it discards
        setTableProps({ ...latestTableProps, ...propsToOverride });
        setAppliedProps({ ...appliedProps, ...getControlledProps(controlledPropsKeys, props) });
    }

    // React can discard a render (e.g. of a transition which is suspended or interrupted), so the latest state
    // and the latest functions, which the actions use, are updated when the render is committed.
    // An insertion effect runs before the layout effects of the children, which dispatch actions (see TableControlled)
    const committedAppliedPropsRef = useRef(appliedProps);
    const isStateOutdatedRef = useRef(false);
    useInsertionEffect(() => {
        callbacksRef.current = callbacks;
        const prevAppliedProps = committedAppliedPropsRef.current;
        if (prevAppliedProps !== appliedProps) {
            // this render has applied the props of the parent
            committedAppliedPropsRef.current = appliedProps;
            if (tablePropsRef.current === latestTableProps) {
                tablePropsRef.current = tableProps;
            } else {
                // actions were dispatched after the render and before this effect: by the cleanup of a layout effect of
                // a removed component, or while React was rendering a transition (its render doesn't block the page).
                // Their states don't have the props of the parent, so the props are applied to the latest state again
                const prevControlledPropsKeys = getControlledPropsKeys(props, prevAppliedProps);
                tablePropsRef.current = {
                    ...tablePropsRef.current,
                    ...getPropsToOverride(prevControlledPropsKeys, props, prevAppliedProps, tablePropsRef.current),
                };
                isStateOutdatedRef.current = true;
            }
        }
    });
    // the updates of these actions are applied after this render: the latest state is set after them
    useIsomorphicLayoutEffect(() => {
        if (isStateOutdatedRef.current) {
            isStateOutdatedRef.current = false;
            setTableProps(tablePropsRef.current);
        }
    });

    const tablePropsWithCallbacks = withCallbacks(tableProps, callbacks);
    // the customizations read table.props while they are rendered, so it is set during rendering
    table.props = tablePropsWithCallbacks;
    // a table mounted with this instance starts from table.props and applies the props changed since the applied ones,
    // so they are set together: after a render which React discards they are the ones of this render
    setTableAppliedProps(table, appliedProps);
    table.changeProps = changeProps;
    table.dispatch = dispatch;
    setTableRendered(table);

    // useTableSelector re-renders its components after the state of the table or its functions are changed
    const { extendedFilter, extendedSort, filter, format, search, sort, validation } = props;
    useIsomorphicLayoutEffect(() => {
        notifyTableChanged(table);
    }, [table, tableProps, extendedFilter, extendedSort, filter, format, search, sort, validation]);

    return (
        <TableInstanceContext.Provider value={table}>
            <TableControlled
                {...tablePropsWithCallbacks}
                childComponents={childComponents}
                dispatch={dispatch}
            />
        </TableInstanceContext.Provider>
    );
};
