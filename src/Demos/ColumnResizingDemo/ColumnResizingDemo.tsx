import './ColumnResizingDemo.scss';

import { DataType, Table } from '../../lib';
import { EditingMode, SortingMode } from '../../lib/enums';

import { Column } from '../../lib/models';
import React from 'react';

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
        editingMode={'cell'}
        data={dataArray}
        columns={columns}
        columnResizing={true}
      />
    </div>
  );
};

export default ColumnResizingDemo;
