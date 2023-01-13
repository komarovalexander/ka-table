import React from 'react';

import { DataType, Table, useTable } from 'ka-table';
import { loadData } from 'ka-table/actionCreators';
import { ActionType } from 'ka-table/enums';
import serverEmulator from './serverEmulator';

const RemoteDataDemo: React.FC = () => {
  const table = useTable({
    onDispatch: async (action) => {
      if (action.type === ActionType.LoadData) {
        table.showLoading();
        const result = await serverEmulator.get(table.props.paging, table.props.columns, action?.pageIndex);
        table.updatePagesCount(result.pagesCount);
        table.updateData(result.data);
        table.hideLoading();
      } else if (action.type === ActionType.UpdatePageIndex) {
        table.setSingleAction(loadData());
      }
    }
  });

  return (
    <div className='remote-data-demo'>
      <Table
        table={table}
        columns= {[
          { key: 'column1', title: 'Column 1', dataType: DataType.String },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String },
          { key: 'column4', title: 'Column 4', dataType: DataType.String },
        ]}
        loading= {{
          enabled: true
        }}
        paging= {{
          enabled: true,
          pageIndex: 0,
          pageSize: 10
        }}
        singleAction={loadData()}
        rowKeyField={'id'}
      />
    </div>
  );
};

export default RemoteDataDemo;
