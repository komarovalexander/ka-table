import * as React from 'react';

import { ITableProps, kaReducer } from '../..';
import { IUncontrollableTableProps } from '../../props';
import { DispatchFunc } from '../../types';
import { ControllableTable } from '../ControllableTable/ControllableTable';

export const UncontrollableTable: React.FunctionComponent<IUncontrollableTableProps> = (props) => {
  const [tableProps, changeTableProps] = React.useState(props);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  React.useEffect(() => {
    changeTableProps(props);
  }, [props]);
  props.state!.get = () => tableProps;

  return (
    <ControllableTable
      {...tableProps}
      dispatch={dispatch}
    />
  );
};
