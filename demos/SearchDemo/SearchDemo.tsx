import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { search } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String, width: '45%' },
    { key: 'score', title: 'Score', dataType: DataType.Number, width: '15%' },
    { dataType: DataType.Boolean, key: 'passed', title: 'Passed' },
  ],
  data: dataArray,
  search: ({ searchText, rowData, column }) => {
    if (column.key === 'passed'){
      return (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed);
    }
  },
  rowKeyField: 'id',
  searchText: 'Billi Bob',
};

const SearchDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <>
      <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
        dispatch(search(event.currentTarget.value));
      }} className='top-element'/>
      <Table
        {...tableProps}
        childComponents={{
          noDataRow: {
            content: () => 'No Data Found'
          }
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default SearchDemo;
