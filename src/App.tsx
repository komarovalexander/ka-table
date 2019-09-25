import './App.css';

import React from 'react';

import DataGrid from './DataGrid/DataGrid';
import { Column } from './DataGrid/Models/Column';

const App: React.FC = () => {
  const columns: Column[] = [
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ];
  const data = [{ column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 }];
  return (
    <div className='App'>
      <DataGrid
        data={data}
        columns={columns}
        rowKey={'id'}
      />
    </div>
  );
};

export default App;
