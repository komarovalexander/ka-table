import React from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';

const dataArray = Array(20).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tableProps: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

class ControlledClassComponentDemo extends React.Component<any, { tableProps: ITableProps }> {
  constructor(props: any) {
    super(props);
    this.state = { tableProps };
    this.dispatch = this.dispatch.bind(this);
  }

  public render() {
    return (
      <Table
      {...this.state.tableProps}
      dispatch={this.dispatch} />
    );
  }

  private dispatch(action: any) {
    this.setState((prevState) => ({
      ...prevState,
      ...{tableProps: kaReducer(prevState.tableProps, action)}
    }));
  }
}

export default ControlledClassComponentDemo;
