import './App.css';

import React, { useState } from 'react';

import Table, { ITableOption } from './Components/Table/Table';
import { SortDirection } from './Enums/SortDirection';
import { DefaultOptions } from './Models/DefaultOptions';
import { OptionChangedParam } from './Models/EventParams/OptionChangedParam';

DefaultOptions.columnSortDirection = SortDirection.Ascend;
const dataArray: any[] = [];

for (let index = 0; index < 10; index++) {
  dataArray.push({ column: index + '1', column2: index + '2', id: index });
}

const tableOption: ITableOption = {
  columns: [
    { field: 'id', title: 'Id', sortDirection: SortDirection.Descend },
    { field: 'column', title: 'Column 1' },
    { field: 'column2', title: 'Column 2' },
  ],
  rowKey: 'id',
};

const App: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
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
