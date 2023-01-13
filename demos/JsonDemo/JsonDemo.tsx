import React from 'react';

import { DataType, Table, useTable } from 'ka-table';
import { loadData } from 'ka-table/actionCreators';
import { ActionType, SortDirection, SortingMode } from 'ka-table/enums';

const JsonDemo: React.FC = () => {
  const table = useTable({
    onDispatch: async (action) => {
      if (action.type === ActionType.LoadData) {
        const response = await fetch('https://komarovalexander.github.io/ka-table/data/employees.json');
        const data = await response.json();
        table.updateData(data);
      }
    }
  });

  return (
    <div className='remote-data-demo'>
      <Table
        table={table}
        columns= {[
          { key: 'name', title: 'Name', dataType: DataType.String },
          { key: 'score', title: 'Score', dataType: DataType.Number, sortDirection: SortDirection.Ascend },
          { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
        ]}
        singleAction={loadData()}
        sortingMode={SortingMode.Single}
        rowKeyField={'id'}
      />
    </div>
  );
};

export default JsonDemo;
