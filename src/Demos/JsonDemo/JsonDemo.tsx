import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { loadData, updateData } from '../../lib/actionCreators';
import { ActionType, DataType, SortDirection, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String },
    { key: 'score', title: 'Score', dataType: DataType.Number, sortDirection: SortDirection.Ascend },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  singleAction: loadData(),
  sortingMode: SortingMode.Single,
  rowKeyField: 'id',
};

const JsonDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = async (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));

    if (action.type === ActionType.LoadData) {
      const response = await fetch('https://komarovalexander.github.io/ka-table/data/employees.json');
      const data = await response.json();
      dispatch(updateData(data));
    }
  };

  return (
    <div className='remote-data-demo'>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default JsonDemo;
