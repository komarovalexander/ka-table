import './GetDataByPropsDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { search } from '../../lib/actionCreators';
import { DataType, EditingMode, FilteringMode, SortDirection, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';
import { kaPropsUtils } from '../../lib/utils';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2019, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2019, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2019, 10, 9, 10) },
];

const tablePropsInit: ITableProps = {
  columns: [
    { dataType: DataType.String, key: 'name', title: 'Name', sortDirection: SortDirection.Ascend },
    { key: 'score', title: 'Score', dataType: DataType.Number },
    {
      dataType: DataType.Boolean,
      key: 'passed',
      title: 'Passed',
    },
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  filteringMode: FilteringMode.FilterRow,
  sortingMode: SortingMode.Single,
};

const GetDataByPropsDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  const data = kaPropsUtils.getData(tableProps);

  return (
    <div className='obtain-table-data-demo'>
      <input type='search' defaultValue={tableProps.search} onChange={(event) => {
        dispatch(search(event.currentTarget.value));
      }} className='top-element'/>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
      <div className='table-data'>
        <h4>Table Data:</h4>
        <pre className='data'>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default GetDataByPropsDemo;
