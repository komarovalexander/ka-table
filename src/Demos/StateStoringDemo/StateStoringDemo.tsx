import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType, EditingMode, FilteringMode, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const initDataArray = [
  { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
  { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
  { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
  { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
  { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const defaultOption: ITableProps = {
  columns: [
    { key: 'type', title: 'TYPE', dataType: DataType.String, isResizable: true },
    { key: 'name', title: 'NAME', dataType: DataType.String, isResizable: true },
    { key: 'country', title: 'COUNTRY', dataType: DataType.String, isResizable: true },
    { key: 'age', title: 'AGE', dataType: DataType.Number, width: '50%', isResizable: true },
  ],
  data: initDataArray,
  editingMode: EditingMode.Cell,
  filteringMode: FilteringMode.FilterRow,
  groups: [{ columnKey: 'country' }, { columnKey: 'type' }],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const OPTION_KEY = 'state-storing-demo-table-option';
const tablePropsInit: ITableProps = {...defaultOption, ...JSON.parse(localStorage.getItem(OPTION_KEY) || '0')};

const StateStoringDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => {
      const newState = kaReducer(prevState, action);
      const { data, ...settingsWithoutData } = newState;
      localStorage.setItem(OPTION_KEY, JSON.stringify(settingsWithoutData));
      return newState;
    });
  };
  return (
    <>
      <button onClick={() => window.location.reload()} className='top-element' >Reload Page</button>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </>
  );
};

export default StateStoringDemo;
