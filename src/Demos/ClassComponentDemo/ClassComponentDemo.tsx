import React from 'react';

import { ITableOption, Table } from '../../lib';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
import { TableStateStore } from '../../lib/state';

const dataArray = Array(20).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tableOption: ITableOption = {
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
const tableStateStore = new TableStateStore();
class ClassComponentDemo extends React.Component<any, ITableOption> {
  constructor(props: any) {
    super(props);
    this.state = tableOption;
    tableStateStore.useState([this.state, this.setState]);
  }
  public render() {
    return (
      <Table state={tableStateStore} />
    );
  }
}

export default ClassComponentDemo;
