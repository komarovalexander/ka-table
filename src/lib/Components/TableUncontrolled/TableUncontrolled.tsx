import * as React from 'react';

import { ITableInstance, ITableProps } from '../Table/Table';

import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc } from '../../types';
import { TableControlled } from '../TableControlled/TableControlled';
import { getTable } from '../../hooks/UseTable';
import { kaReducer } from '../../Reducers/kaReducer';

export interface ITableUncontrolledProps extends ITableProps {
  childComponents?: ChildComponents;
  table?: ITableInstance;
}

export const TableInstanceContext = React.createContext<ITableInstance>({} as ITableInstance);

export const TableUncontrolled: React.FunctionComponent<ITableUncontrolledProps> = (props) => {
  const { table: _, ...tablePropsControlled } = props;
  const [tableProps, changeTableProps] = React.useState({ ...tablePropsControlled, ...props.table?.props });
  const contextTable = props.table || getTable();

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => {
      const nextState = kaReducer(prevState, action);
      setTimeout(() => {
        contextTable.onDispatch?.(action, nextState);
      }, 0);
      return nextState;
    });
  };
  contextTable.props = { 
    ...tableProps, 
    searchText: props.searchText,
    loading: props.loading,
    data: props.data,
    paging: props.paging 
  };
  contextTable.changeProps = changeTableProps;
  contextTable.dispatch = dispatch;

  return (
    <TableInstanceContext.Provider value={contextTable}>
      <TableControlled
        {...contextTable.props}
       // paging={ props.paging }
        childComponents={props.childComponents}
        extendedFilter={props.extendedFilter}
        filter={props.filter}
        format={props.format}
        dispatch={dispatch}
      />
    </TableInstanceContext.Provider>
  );
};
