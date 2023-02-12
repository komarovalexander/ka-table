import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, SortDirection, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import { getSortedColumns } from 'ka-table/Utils/PropsUtils';

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
    {
      dataType: DataType.String,
      key: 'name',
      width: '33%',
      title: 'Name',
    },
    { key: 'score', title: 'Score', width: '15%', dataType: DataType.Number, sortDirection: SortDirection.Ascend },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  data: dataArray,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const SortingModesDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <>
      sortingMode:
      <select
        value={tableProps.sortingMode}
        onChange={(e) => changeTableProps({ ...tablePropsInit, sortingMode: e.target.value as any })}
        style={{marginBottom: 20}}>
        <option value={SortingMode.Single}>Single</option>
        <option value={SortingMode.SingleTripleState}>SingleTripleState</option>
        <option value={SortingMode.SingleRemote}>SingleRemote</option>
        <option value={SortingMode.SingleTripleStateRemote}>SingleTripleStateRemote</option>
        <option value={SortingMode.MultipleRemote}>MultipleRemote</option>
        <option value={SortingMode.MultipleTripleStateRemote}>MultipleTripleStateRemote</option>
      </select>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
      <div style={{marginTop: 20}}>
        <span style={{fontSize: 12}}>sorted columns:</span> {getSortedColumns(tableProps).map(c => `${c.key}: ${c.sortDirection}; `)}
      </div>
      <div style={{fontSize: 12}}>
        <b>'*Remote' sorting</b> modes do not sort data, it should be done outside of the grid,
          see <a href='#/remote-data-editing'>remote data editing demo</a> for details
      </div>
    </>
  );
};

export default SortingModesDemo;
