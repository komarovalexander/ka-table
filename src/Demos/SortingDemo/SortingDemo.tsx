import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, SortDirection, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

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
      sortDirection: SortDirection.Descend,
      style: { width: '33%' },
      title: 'Name',
    },
    { key: 'score', title: 'Score', style: { width: '10%' }, dataType: DataType.Number, sortDirection: SortDirection.Ascend },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  data: dataArray,
  rowKeyField: 'id',
  sortingMode: SortingMode.SingleRemote,
};

const SortingDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <>
      sortingMode:
      <select
        value={tableProps.sortingMode}
        onChange={(e) => changeTableProps({ ...tableProps, sortingMode: e.target.value as any })}
        style={{marginBottom: 20}}>
        <option value={SortingMode.Single}>Single</option>
        <option value={SortingMode.SingleWithEmpty}>SingleWithEmpty</option>
        <option value={SortingMode.SingleRemote}>SingleRemote</option>
        <option value={SortingMode.SingleWithEmptyRemote}>SingleWithEmptyRemote</option>
        <option value={SortingMode.MultipleRemote}>MultipleRemote</option>
      </select>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
      <div style={{marginTop: 20}}>
        <span style={{fontSize: 12}}>sorted columns:</span> {tableProps.columns.filter(c => c.sortDirection).map(c => `${c.key}: ${c.sortDirection}; `)}
      </div>
      <div style={{fontSize: 12}}>
        *only <b>not '*Remote' sorting</b> mode changes the sorting of columns locally. The rest modes should do it outside of the grid
      </div>
    </>
  );
};

export default SortingDemo;
