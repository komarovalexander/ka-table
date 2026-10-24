import * as React from 'react';

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

export const TableInstanceContext = React.createContext<ITableInstance>({} as ITableInstance);

export const TableUncontrolled: React.FunctionComponent<ITableUncontrolledPropsKeys> = (props) => {
    const { table: tableFromProps, childComponents, ...tablePropsControlled } = props;
    const [ownTable] = React.useState(() => getTable());
    const table = tableFromProps || ownTable;

    const [tableProps, setTableProps] = React.useState<ITableProps>(() => ({ ...tablePropsControlled, ...table.props }));
    // the latest state: several actions dispatched in a row are applied one after another before the next render
    const tablePropsRef = React.useRef(tableProps);
    // the functions are not the state of the table: the latest ones are used for rendering, by the reducer and in table.props
    const callbacks = getCallbackProps(props);
    const callbacksRef = React.useRef(callbacks);
    callbacksRef.current = callbacks;

    const changeProps = React.useCallback((value: React.SetStateAction<ITableProps>) => {
        tablePropsRef.current = typeof value === 'function' ? value(withCallbacks(tablePropsRef.current, callbacksRef.current)) : value;
        setTableProps(tablePropsRef.current);
    }, []);

    const dispatch: DispatchFunc = React.useCallback((action) => {
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
    const [appliedProps, setAppliedProps] = React.useState<Partial<ITableProps>>(() => getTableAppliedProps(table) || props);
    setTableAppliedProps(table, appliedProps);
    const controlledPropsKeys = getControlledPropsKeys(props, appliedProps);
    const propsToOverride = getPropsToOverride(controlledPropsKeys, props, appliedProps, tablePropsRef.current);
    if (Object.keys(propsToOverride).length) {
        // updating the state during rendering: React re-renders the component right away, before rendering children
        changeProps({ ...tablePropsRef.current, ...propsToOverride });
        setAppliedProps({ ...appliedProps, ...getControlledProps(controlledPropsKeys, props) });
    }

    const tablePropsWithCallbacks = withCallbacks(tableProps, callbacks);
    table.props = tablePropsWithCallbacks;
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
