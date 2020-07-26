import './BootstrapDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, EditingMode, FilteringMode, SortingMode } from '../../lib/enums';
import { ChildComponents } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';
import { CustomLookupEditor, DateEditor, NumberEditor } from './editors';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true, tryDate: new Date(2021, 10, 9) },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, tryDate: new Date(2021, 10, 8) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, tryDate: new Date(2019, 11, 8) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true, tryDate: new Date(2021, 12, 9) },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true, tryDate: new Date(2019, 11, 12) },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, tryDate: new Date(2020, 10, 9) },
  { id: 7, name: 'Dick Lee', score: 13, passed: false, tryDate: new Date(2017, 10, 9) },
  { id: 8, name: 'Papa Ricko', score: 73, passed: true, tryDate: new Date(2026, 10, 9) },
  { id: 9, name: 'Treme Watson', score: 61, passed: true, tryDate: new Date(2022, 10, 9) },
];

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String, style: {width: 240} },
    { key: 'score', title: 'Score', dataType: DataType.Number, filterRowOperator: '>', style: {width: 230} },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean, style: {minWidth: 130} },
    { dataType: DataType.Date, key: 'tryDate', title: 'Date', filterRowOperator: '<', style: {minWidth: 100} },
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

const bootstrapChildComponents: ChildComponents = {
  table: {
    elementAttributes: () => ({
      className: 'table table-striped table-hover table-bordered'
    })
  },
  tableHead: {
    elementAttributes: () => ({
      className: 'thead-dark'
    })
  },
  noDataRow: {
    content: () => 'No Data Found'
  },
  filterRowCell: {
    content: (props) => {
      const getEditor = () => {
        switch (props.column.key){
          case 'passed': return <CustomLookupEditor {...props}/>;
          case 'name': return <></>;
          case 'score': return <NumberEditor {...props}/>;
          case 'tryDate': return <DateEditor {...props}/>;
        }
      }
      return (
        <div className='d-flex'>{getEditor()}</div>
      )
    }
  }
};

const BootstrapDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='bootstrap-demo'>
      <Table
        {...tableProps}
        childComponents={bootstrapChildComponents}
        dispatch={dispatch}
      />
    </div>
  );
};

export default BootstrapDemo;
