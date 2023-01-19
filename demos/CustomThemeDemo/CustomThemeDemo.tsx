// open TS Example or JS Example to see how to override styles
import './CustomThemeDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, FilteringMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(119).fill(undefined).map(
  (_, index) => ({
    column1: index % 2 === 0,
    column2: `column:2 row:${index}`,
    column3: index % 5,
    column4: new Date(2022, 11, index),
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.Boolean, style: {minWidth: 130}   },
    { key: 'column2', title: 'Column 2', dataType: DataType.String, style: {width: 240} },
    { key: 'column3', title: 'Column 3', dataType: DataType.Number, style: {width: 230}  },
    { key: 'column4', title: 'Column 4', dataType: DataType.Date, style: {minWidth: 100} },
  ],
  format: ({ column, value }) => {
    if (column.dataType === DataType.Date){
      return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
    }
  },
  paging: {
    enabled: true,
    pageSize: 7,
    pageIndex: 0
  },
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow
};

const CustomThemeDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='custom-theme-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default CustomThemeDemo;
