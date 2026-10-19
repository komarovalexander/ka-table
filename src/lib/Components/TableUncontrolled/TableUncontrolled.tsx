import * as React from 'react';

import { ITableInstance, ITableProps } from '../Table/Table';
import { getControlledProps, getControlledPropsKeys, getPropsToOverride } from './utils';

import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc } from '../../types';
import { TableControlled } from '../TableControlled/TableControlled';
import { notifyTableChanged, setTableRendered } from '../../Utils/TableInstanceUtils';

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

    const changeProps = React.useCallback((value: React.SetStateAction<ITableProps>) => {
        tablePropsRef.current = typeof value === 'function' ? value(tablePropsRef.current) : value;
        setTableProps(tablePropsRef.current);
    }, []);

    const dispatch: DispatchFunc = React.useCallback((action) => {
        // the state is calculated outside of the setState updater: React calls updaters twice in StrictMode
        const prevState = tablePropsRef.current;
        const nextStateDefault = kaReducer(prevState, action);
        const nextState = table.customReducer?.(nextStateDefault, action, prevState) ?? nextStateDefault;
        changeProps(nextState);
        setTimeout(() => {
            table.onDispatch?.(action, nextState, prevState);
        }, 0);
    }, [table, changeProps]);

    // controlled props are applied when the parent component changes them, not on every render
    const [appliedProps, setAppliedProps] = React.useState<Partial<ITableProps>>(props);
    const controlledPropsKeys = getControlledPropsKeys(props);
    const propsToOverride = getPropsToOverride(controlledPropsKeys, props, appliedProps, tablePropsRef.current);
    if (Object.keys(propsToOverride).length) {
        // updating the state during rendering: React re-renders the component right away, before rendering children
        changeProps({ ...tablePropsRef.current, ...propsToOverride });
        setAppliedProps({ ...appliedProps, ...getControlledProps(controlledPropsKeys, props) });
    }

    table.props = tableProps;
    table.changeProps = changeProps;
    table.dispatch = dispatch;
    setTableRendered(table);

    // useTableSelector re-renders its components after the state of the table is committed
    useIsomorphicLayoutEffect(() => {
        notifyTableChanged(table);
    }, [table, tableProps]);

    return (
        <TableInstanceContext.Provider value={table}>
            <TableControlled
                {...tableProps}
                childComponents={childComponents}
                extendedFilter={props.extendedFilter}
                filter={props.filter}
                format={props.format}
                dispatch={dispatch}
            />
        </TableInstanceContext.Provider>
    );
};
