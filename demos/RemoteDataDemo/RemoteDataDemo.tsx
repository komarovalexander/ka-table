import { DataType, Table, useTable } from 'ka-table';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useState } from 'react';

import { ActionType } from 'ka-table/enums';
import { useGet } from './serverEmulator';

const RemoteDataTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const getQuery = useGet(pageIndex);
  const table = useTable({
    onDispatch: async (action) => {
      if (action.type === ActionType.UpdatePageIndex) {
        setPageIndex(action.pageIndex);
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
        data={getQuery.data?.data || []}
        loading= {{
          enabled: getQuery.isLoading
        }}
        paging= {{
          enabled: true,
          pageIndex,
          pageSize: 10,
          pagesCount: getQuery.data?.pagesCount
        }}
        rowKeyField={'id'}
      />
    </div>
  );
};

export const queryClient = new QueryClient();

const RemoteDataDemo = () => (
	<QueryClientProvider client={queryClient}>
    <RemoteDataTable />
  </QueryClientProvider>
);

export default RemoteDataDemo;
