import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { hideLoading, loadData, showLoading, updateData } from 'ka-table/actionCreators';
import { ActionType, DataType, SortDirection } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const tablePropsInit: ITableProps = {
  columns: [
    { dataType: DataType.String, key: 'name', title: 'Name' },
    { key: 'score', title: 'Score', dataType: DataType.Number, sortDirection: SortDirection.Ascend },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
  ],
  loading: {
    enabled: true
  },
  singleAction: loadData(),
  rowKeyField: 'id',
};

const JsonDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = async (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));

    if (action.type === ActionType.LoadData) {
      dispatch(showLoading());
      const response = await fetch('data/employees.json');
      const data = await response.json();
      dispatch(updateData(data));
      dispatch(hideLoading());
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
