import * as React from 'react';

import { getTable } from '../../hooks/UseTable';
import { ChildComponents } from '../../Models/ChildComponents';
import { kaReducer } from '../../Reducers/kaReducer';
import { DispatchFunc } from '../../types';
import { ITableInstance, ITableProps } from '../Table/Table';
import { TableControlled } from '../TableControlled/TableControlled';

export interface ITableUncontrolledProps extends ITableProps {
  childComponents?: ChildComponents;
  table?: ITableInstance;
}

export const TableInstanceContext = React.createContext<ITableInstance>({} as ITableInstance);

export const TableUncontrolled: React.FunctionComponent<ITableUncontrolledProps> = (props) => {
  const [tableProps, changeTableProps] = React.useState({...props, ...props.table?.props});
  const { table: _, ...tablePropsUncontrolled } = tableProps;
  const contextTable = props.table || getTable();

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => {
      const nextState = kaReducer(prevState, action);
      console.log(1);
      setTimeout(() => {
        console.log(2);
        contextTable.onDispatch?.(action, nextState);
      }, 0)
      return nextState;
    });
  };
  contextTable.props = tablePropsUncontrolled;
  contextTable.changeProps = changeTableProps;
  contextTable.dispatch = dispatch;

  return <TableInstanceContext.Provider value={contextTable}><TableControlled {...tablePropsUncontrolled} dispatch={dispatch} /></TableInstanceContext.Provider>
};
