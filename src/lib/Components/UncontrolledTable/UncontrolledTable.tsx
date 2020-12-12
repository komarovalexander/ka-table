import * as React from 'react';

import { ITableProps, kaReducer } from '../..';
import { IUncontrollableTableProps } from '../../props';
import { DispatchFunc } from '../../types';
import { ControlledTable } from '../ControlledTable/ControlledTable';

export const UncontrolledTable: React.FunctionComponent<IUncontrollableTableProps> = (props) => {
  const [tableProps, changeTableProps] = React.useState(props);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  React.useEffect(() => {
    changeTableProps(props);
  }, [props]);
  if (props.state){
    props.state.get = () => tableProps;
  }

  return (
    <ControlledTable
      {...tableProps}
      dispatch={dispatch}
    />
  );
};
