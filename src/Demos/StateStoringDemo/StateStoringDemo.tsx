import { DataType, EditingMode, FilteringMode, SortingMode } from '../../lib/enums';
import { Table, useTable } from '../../lib';

import React from 'react';

const initDataArray = [
  { id: 1, type: 'Cat', name: 'Kas', country: 'Czech Republic', age: 2 },
  { id: 2, type: 'Dog', name: 'Rex', country: 'Montenegro', age: 6 },
  { id: 3, type: 'Cat', name: 'Simba', country: 'France', age: 12 },
  { id: 4, type: 'Dog', name: 'Beethoven', country: 'Czech Republic', age: 3 },
  { id: 5, type: 'Cat', name: 'Hash', country: 'Czech Republic', age: 8 },
];

const OPTION_KEY = 'state-storing-demo-table-option';
const savedOptions = {...JSON.parse(localStorage.getItem(OPTION_KEY) || '0')};

const StateStoringDemo: React.FC = () => {
  const table = useTable({
    onDispatch: (action, newProps) => {
      const { data, ...settingsWithoutData } = newProps;
      localStorage.setItem(OPTION_KEY, JSON.stringify(settingsWithoutData));
    }
  });
  return (
    <>
      <button onClick={() => window.location.reload()} className='top-element' >Reload Page</button>
      <Table
        table={table}
        columns={[
          { key: 'type', title: 'TYPE', dataType: DataType.String, isResizable: true },
          { key: 'name', title: 'NAME', dataType: DataType.String, isResizable: true },
          { key: 'country', title: 'COUNTRY', dataType: DataType.String, isResizable: true },
          { key: 'age', title: 'AGE', dataType: DataType.Number, width: '50%', isResizable: true },
        ]}
        data={initDataArray}
        editingMode={'cell'}
        filteringMode={FilteringMode.FilterRow}
        groups={[{ columnKey: 'country' }, { columnKey: 'type' }]}
        rowKeyField={'id'}
        sortingMode={SortingMode.Single}
        {...savedOptions}
      />
    </>
  );
};

export default StateStoringDemo;
