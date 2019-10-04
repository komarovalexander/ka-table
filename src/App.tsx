import './App.css';

import React, { useState } from 'react';

import DataGrid from './DataGrid/DataGrid';
import { SortDirection } from './DataGrid/Enums/SortDirection';
import { DefaultOptions } from './DataGrid/Models/DefaultOptions';
import { OptionChangedParam } from './DataGrid/Models/EventParams/OptionChangedParam';

DefaultOptions.columnSortDirection = SortDirection.Ascend;
const dataArray = [
  { column: 1, column2: 332, id: 1 },
  { column: 312, column2: 422, id: 32 },
  { column: 413, column2: 323, id: 13 },
  { column: 214, column2: 224, id: 44 },
];

const dataGridProps = {
  columns: [
    { key: 'id', name: 'Id', sortDirection: SortDirection.Descend },
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ],
  rowKey: 'id',
};

const App: React.FC = () => {
  const [option, changeOptions] = useState(dataGridProps);
  const onOptionChanged = (newOption: OptionChangedParam) => {
    changeOptions({...option, ...newOption.value });
  };
  return (
    <div className='App'>
      <DataGrid
        {...option}
        data={dataArray}
        onOptionChanged={onOptionChanged}
      />
    </div>
  );
};

export default App;
