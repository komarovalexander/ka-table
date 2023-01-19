// open TS Example or JS Example to see how to override styles
import './ResponsiveDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `value:1 row:${index}`,
    column2: `value:2 row:${index}`,
    column3: `value:3 row:${index}`,
    column4: `value:4 row:${index}`,
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const ResponsiveDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='responsive-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          cell: {
            elementAttributes: ({ column }) => ({
              'data-column': column.title
            } as any)
          }
        }}
      />
      <br />
      <div>
        Based on the <a href='https://codepen.io/andornagy/pen/EVXpbR' target='_blank' rel='noopener noreferrer'>example</a>.
        But notice that ka-table can be used with any adaptive approach of HTML tables.</div>
    </div>
  );
};

export default ResponsiveDemo;
