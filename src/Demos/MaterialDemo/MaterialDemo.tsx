import './MaterialDemo.scss';

import { DataType, FilteringMode, SortingMode } from '../../lib/enums';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Table, useTable } from '../../lib';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import { filterAndSearchData } from '../../lib/Utils/FilterUtils';

const dataArray = Array(119)
    .fill(undefined)
    .map((_, index) => ({
        column1: index % 2 === 0,
        column2: `column:2 row:${index}`,
        column3: index % 5,
        column4: new Date(2022, 11, index),
        id: index,
    }));

const MaterialDemo = () => {
    const table = useTable();
    return (
        <div className='material-demo'>
            <Table
                table={table}
                columns={[
                    {
                        key: 'column1',
                        title: 'Column 1',
                        dataType: DataType.Boolean,
                        style: { minWidth: 130 },
                        filterRowValue: true,
                        isEditable: false,
                    },
                    { key: 'column2', title: 'Column 2', dataType: DataType.String, style: { width: 240 } },
                    { key: 'column3', title: 'Column 3', dataType: DataType.Number, style: { width: 230 } },
                    { key: 'column4', title: 'Column 4', dataType: DataType.Date, style: { minWidth: 100 } },
                ]}
                format={({ column, value }) => {
                    if (column.dataType === DataType.Date) {
                        return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
                    }
                }}
                paging={{
                    enabled: true,
                    pageSize: 7,
                    pageIndex: 0,
                }}
                data={dataArray}
                rowKeyField='id'
                sortingMode={SortingMode.Single}
                filteringMode={FilteringMode.FilterRow}
                childComponents={{
                    noDataRow: {
                        content: () => 'No Data Found',
                    },
                    filterRowCell: {
                        content: (props) => {
                            const { column } = props;
                            switch (column.key) {
                            case 'column1':
                                return (
                                    <Checkbox
                                        style={{ marginLeft: -12 }}
                                        checked={column.filterRowValue || false}
                                        indeterminate={column.filterRowValue == null}
                                        onChange={(e, checked?: boolean) => {
                                            if (column.filterRowValue === false) {
                                                if (checked === true) {
                                                    checked = undefined;
                                                }
                                            }
                                            table.updateFilterRowValue(column.key, checked);
                                        }}
                                    />
                                );
                            }
                            if (column.dataType === DataType.String) {
                                return (
                                    <TextField
                                        variant='standard'
                                        value={column.filterRowValue ?? ''}
                                        onChange={(event) => {
                                            table.updateFilterRowValue(column.key, event.target.value);
                                        }}
                                    />
                                );
                            }
                            if (column.dataType === DataType.Number) {
                                return (
                                    <TextField
                                        variant='standard'
                                        type='number'
                                        value={column.filterRowValue ?? ''}
                                        onChange={(event) => {
                                            table.updateFilterRowValue(column.key, event.target.value ? Number(event.target.value) : event.target.value);
                                        }}
                                    />
                                );
                            }
                            if (column.dataType === DataType.Date) {
                                return (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={column.filterRowValue ?? null}
                                            onChange={(value: any) => {
                                                table.updateFilterRowValue(column.key, value);
                                            }}
                                            renderInput={(params: any) => (
                                                <TextField
                                                    variant='standard'
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                );
                            }
                        },
                    },
                    pagingPages: {
                        content: (props) => {
                            return (
                                <table>
                                    <tbody>
                                        <tr>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 7, 10]}
                                                onRowsPerPageChange={(e) => {
                                                    table.updatePageSize(Number(e.target.value));
                                                }}
                                                count={filterAndSearchData(table.props).length}
                                                onPageChange={(e, page) => {
                                                    table.updatePageIndex(page);
                                                }}
                                                page={props.pageIndex ?? 0}
                                                rowsPerPage={props.pageSize ?? 0}
                                            />
                                        </tr>
                                    </tbody>
                                </table>
                            );
                        },
                    },
                }}
            />
        </div>
    );
};

export default MaterialDemo;
