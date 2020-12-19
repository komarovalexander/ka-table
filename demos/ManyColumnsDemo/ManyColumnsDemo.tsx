import React from 'react';

import { Table } from 'ka-table';
import { DataType } from 'ka-table/enums';
import { Column } from 'ka-table/models';

const columns: Column[] = Array(100).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    style: { width: 150 },
    title: 'Column ' + index,
    type: DataType.String,
  }),
);

const dataArray = Array(30).fill(undefined).map(
  (_, index) => columns.reduce((previousValue: any, currentValue) => {
    previousValue[currentValue.key] = `${currentValue.key} row:${index}`;
    return previousValue;
  }, { id: index }),
);

const ManyColumnsDemo: React.FC = () => (
  <Table
    columns={columns}
    data={dataArray}
    rowKeyField='id'
  />
);

export default ManyColumnsDemo;
