import { ActionType, EditingMode, SortingMode } from '../../lib/enums';
import { DataType, Table, useTable } from '../../lib';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useState } from 'react';
import { useDelete, useGet, useUpdate } from './serverEmulator';

import { Column } from '../../lib/models';
import { DeleteRow } from './components';
import { ReactQueryDevtools } from 'react-query/devtools';

const RemoteDataEditingTable = () => {
    const [columns, setColumns] = useState<Column[]>([
        { key: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
        { key: 'column3', title: 'Column 3', dataType: DataType.String },
        { key: 'column4', title: 'Column 4', dataType: DataType.String },
        { key: ':delete', width: 70, style: { textAlign: 'center' }},
    ]);
    const [pageIndex, setPageIndex] = useState(0);
    const getQuery = useGet(pageIndex, columns);
    const { mutateAsync: deleteItem, isLoading: deleting } = useDelete();
    const { mutateAsync: updateItem, isLoading: updating } = useUpdate();
    const table = useTable({
        onDispatch: async (action, newState) => {
            if (action.type === ActionType.UpdatePageIndex) {
                setPageIndex(action.pageIndex);
            }
            if (action.type === ActionType.DeleteRow) {
                await deleteItem(action.rowKeyValue);
            }
            if (action.type === ActionType.UpdateCellValue) {
                await updateItem({ id: action.rowKeyValue, data: { [action.columnKey]: action.value } });
            }
            if (action.type === ActionType.UpdateSortDirection) {
                setColumns(newState.columns)
            }
        }
    });

    return (
        <div className='remote-data-demo'>
            <Table
                table={table}
                columns={columns}
                editingMode={EditingMode.Cell}
                data={getQuery.data?.data || []}
                loading= {{
                    enabled: getQuery.isLoading || deleting || updating
                }}
                paging= {{
                    enabled: true,
                    pageSize: 10,
                    pagesCount: getQuery.data?.pagesCount
                }}
                sortingMode={SortingMode.SingleTripleStateRemote}
                rowKeyField={'id'}
                childComponents={{
                    cell: {
                        content: (props) => {
                            if (props.column.key === ':delete'){
                                return <DeleteRow {...props} />
                            }
                        }
                    }
                }}
            />
        </div>
    );
};


export const queryClient = new QueryClient();

const RemoteDataEditingDemo = () => (
    <QueryClientProvider client={queryClient}>
        <RemoteDataEditingTable />

        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);

export default RemoteDataEditingDemo;
