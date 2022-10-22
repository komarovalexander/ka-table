import * as React from 'react';

import { ChildComponents } from '../../Models/ChildComponents';
import { kaReducer } from '../../Reducers/kaReducer';
import { DispatchFunc } from '../../types';
import { ITableProps } from '../Table/Table';
import { TableControlled } from '../TableControlled/TableControlled';

export interface ITableUncontrolledProps extends ITableProps {
  childComponents?: ChildComponents;
  table?: ITableInstance;
}

export interface ITableInstance {
  props: ITableProps;
  changeProps: React.Dispatch<React.SetStateAction<ITableProps>>;
  onDispatch: DispatchFunc;
}

export const TableUncontrolled: React.FunctionComponent<ITableUncontrolledProps> = (props) => {
  const [tableProps, changeTableProps] = React.useState(props);

  const { table, ...tablePropsUncontrolled } = tableProps;
  if (props.table){
    props.table.props = tablePropsUncontrolled;
    props.table.changeProps = changeTableProps;
  }

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    props.table?.onDispatch?.(action);
  };

  return <TableControlled {...tablePropsUncontrolled} dispatch={dispatch} />
};
