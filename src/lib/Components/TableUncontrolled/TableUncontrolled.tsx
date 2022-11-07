import * as React from 'react';

import { ChildComponents } from '../../Models/ChildComponents';
import { kaReducer } from '../../Reducers/kaReducer';
import { DispatchFunc } from '../../types';
import { ITableInstance, ITableProps } from '../Table/Table';
import { TableControlled } from '../TableControlled/TableControlled';

export interface ITableUncontrolledProps extends ITableProps {
  childComponents?: ChildComponents;
  onDispatch?: DispatchFunc;
  table?: ITableInstance;
}


export const TableUncontrolled: React.FunctionComponent<ITableUncontrolledProps> = (props) => {
  const [tableProps, changeTableProps] = React.useState({...props, ...props.table?.props});

  const { table, ...tablePropsUncontrolled } = tableProps;
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => {
      const nextState = kaReducer(prevState, action);
      return nextState;
    });
    props.table?.onDispatch?.(action);
    props.onDispatch?.(action);
  };
  if (props.table){
    props.table.props = tablePropsUncontrolled;
    props.table.changeProps = changeTableProps;
  }
  

  return <TableControlled {...tablePropsUncontrolled} dispatch={dispatch} />
};
