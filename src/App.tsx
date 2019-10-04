import './App.css';

import React, { useState } from 'react';

import { SortDirection } from './Table/Enums/SortDirection';
import { DefaultOptions } from './Table/Models/DefaultOptions';
import { OptionChangedParam } from './Table/Models/EventParams/OptionChangedParam';
import Table from './Table/Table';

DefaultOptions.columnSortDirection = SortDirection.Ascend;
const dataArray = [
  { column: 1, column2: 332, id: 1 },
  { column: 312, column2: 422, id: 32 },
  { column: 413, column2: 323, id: 13 },
  { column: 214, column2: 224, id: 44 },
];

const tableProps = {
  columns: [
    { key: 'id', name: 'Id', sortDirection: SortDirection.Descend },
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ],
  rowKey: 'id',
};

const App: React.FC = () => {
  const [option, changeOptions] = useState(tableProps);
  const onOptionChanged = (newOption: OptionChangedParam) => {
    changeOptions({...option, ...newOption.value });
  };
  return (
    <div className='App'>
      <Table
        {...option}
        data={dataArray}
        onOptionChanged={onOptionChanged}
      />
    </div>
  );
};

export default App;
