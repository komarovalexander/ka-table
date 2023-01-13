import React from 'react';

import { DataType, Table, useTable } from '../../lib';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false },
  { id: 3, name: 'Tom Williams', score: 45, passed: false },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false },
];

const SearchDemo: React.FC = () => {
  const defaultSearchText = 'Billi Bob';
  const table = useTable();
  return (
    <>
      <input type='search' defaultValue={defaultSearchText} onChange={(event) => {
        table.search(event.currentTarget.value);
      }} className='top-element'/>
      <Table
        table={table}
        columns= {[
          { key: 'name', title: 'Name', dataType: DataType.String, width: '45%' },
          { key: 'score', title: 'Score', dataType: DataType.Number, width: '15%' },
          { dataType: DataType.Boolean, key: 'passed', title: 'Passed' },
        ]}
        data={dataArray}
        search= {({ searchText, rowData, column }) => {
          if (column.key === 'passed'){
            return (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed);
          }
        }}
        rowKeyField={'id'}
        searchText={defaultSearchText}
        childComponents={{
          noDataRow: {
            content: () => 'No Data Found'
          }
        }}
      />
    </>
  );
};

export default SearchDemo;
