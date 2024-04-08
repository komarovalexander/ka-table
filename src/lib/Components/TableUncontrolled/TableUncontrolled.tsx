import * as React from 'react';

import { ITableInstance, ITableProps } from '../Table/Table';
import { getControlledPropsKeys, getPropsToOverride } from './utils';

import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc } from '../../types';
import { TableControlled } from '../TableControlled/TableControlled';
import { getTable } from '../../hooks/UseTable';
import { kaReducer } from '../../Reducers/kaReducer';

export interface ITableUncontrolledPropsKeys extends ITableProps {
    childComponents?: ChildComponents;
    table?: ITableInstance;
}

export const TableInstanceContext = React.createContext<ITableInstance>({} as ITableInstance);

export const TableUncontrolled: React.FunctionComponent<ITableUncontrolledPropsKeys> = (props) => {
    const { table: _, childComponents, ...tablePropsControlled } = props;
    const [tableProps, changeTableProps] = React.useState({ ...tablePropsControlled, ...props.table?.props });

    const dispatch: DispatchFunc = (action) => {
        changeTableProps((prevState: ITableProps) => {
            const nextStateDefault = kaReducer(prevState, action);
            const nextState = props.table?.customReducer ? (props.table.customReducer(nextStateDefault, action, prevState) ?? nextStateDefault) : nextStateDefault;
            setTimeout(() => {
                props.table?.onDispatch?.(action, nextState);
            }, 0);
            return nextState;
        });
    };

    React.useEffect(() => {
        const controlledPropsKeys = getControlledPropsKeys(props);
        const propsToOverride = getPropsToOverride(controlledPropsKeys, props, tableProps);
        if (Object.keys(propsToOverride).length){
            if (propsToOverride?.paging){
                propsToOverride.paging = {...tableProps.paging, ...propsToOverride.paging };
            }
            changeTableProps({...tableProps, ...propsToOverride});
        }
    }, [props]);

    const contextTable = props.table || getTable();
    contextTable.props = tableProps;
    contextTable.changeProps = changeTableProps;
    contextTable.dispatch = dispatch;

    return (
        <TableInstanceContext.Provider value={contextTable}>
            <TableControlled
                {...contextTable.props}
                // paging={ props.paging }
                childComponents={childComponents}
                extendedFilter={props.extendedFilter}
                filter={props.filter}
                format={props.format}
                dispatch={dispatch}
            />
        </TableInstanceContext.Provider>
    );
};
