import './ColumnResizingDemo.scss';

import React from 'react';

import { DataType, Table } from 'ka-table';
import { EditingMode, SortingMode } from 'ka-table/enums';
import { Column } from 'ka-table/models';

const columns: Column[] = Array(15).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    colGroup: { style: { minWidth: 100 }},
    width: 200,
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

const ColumnResizingDemo: React.FC = () => {

  return (
    <div className='column-resizing-demo'>
      <Table
        sortingMode={SortingMode.Single}
        rowKeyField={'id'}
        editingMode={EditingMode.Cell}
        data={dataArray}
        columns={columns}
        columnResizing={true}
      />
    </div>
  );
};

export default ColumnResizingDemo;
