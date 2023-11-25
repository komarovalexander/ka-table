import './KeyboardNavigation.scss';

import React from 'react';

import { DataType, Table, useTable } from '../../lib';
import { EditingMode, SortingMode } from '../../lib/enums';

const dataArray = Array(100).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);

const KeyboardNavigationDemo: React.FC = () => {
    const table = useTable();
    return (
        <div className='keyboard-navigation-demo'>
            <Table
                table={table}
                columns= {[
                    { key: 'column1', title: 'Column 1', dataType: DataType.String },
                    { key: 'column2', title: 'Column 2', dataType: DataType.String },
                    { key: 'column3', title: 'Column 3', dataType: DataType.String },
                    { key: 'column4', title: 'Column 4', dataType: DataType.String },
                ]}
                data={dataArray}
                rowKeyField={'id'}
                sortingMode={SortingMode.Single}
                editingMode={EditingMode.Cell}
                paging= {{
                    enabled: true,
                    pageIndex: 0,
                    pageSize: 10,
                }}
                focused= {{
                    cell: {
                        columnKey: 'column4',
                        rowKeyValue: 2
                    }
                }}
                childComponents={{
                    cell: {
                        elementAttributes: ({column, rowKeyValue, isEditableCell}) => {
                            if (isEditableCell) return undefined;

                            const cell = { columnKey: column.key, rowKeyValue }
                            const isFocused = cell.columnKey === table.props.focused?.cell?.columnKey
                && cell.rowKeyValue === table.props.focused?.cell?.rowKeyValue;
                            return {
                                tabIndex: 0,
                                ref: (ref: any) => isFocused && ref?.focus(),
                                onKeyUp: (e) => {
                                    switch (e.keyCode){
                                    case 39: table.moveFocusedRight({ end: e.ctrlKey }); break;
                                    case 37: table.moveFocusedLeft({ end: e.ctrlKey }); break;
                                    case 38: table.moveFocusedUp({ end: e.ctrlKey }); break;
                                    case 40: table.moveFocusedDown({ end: e.ctrlKey }); break;
                                    case 13:
                                        table.openEditor(cell.rowKeyValue, cell.columnKey);
                                        table.setFocused({ cellEditorInput: cell });
                                        break;
                                    }
                                },
                                onFocus: () => !isFocused &&  table.setFocused({ cell: { columnKey: column.key, rowKeyValue } }),
                                onKeyDown: (e) => e.keyCode !== 9 && e.preventDefault(),
                                onBlur: () => isFocused && table.clearFocused()
                            }
                        },
                    },
                    cellEditorInput: {
                        elementAttributes: ({column, rowKeyValue}) => {
                            const isFocused = column.key === table.props.focused?.cellEditorInput?.columnKey
                && rowKeyValue === table.props.focused?.cellEditorInput?.rowKeyValue;
                            const cell = { columnKey: column.key, rowKeyValue };
                            return {
                                ref: (ref: any) => isFocused && ref?.focus(),
                                onKeyUp: (e) => e.keyCode === 13 && table.setFocused({ cell }),
                                onBlur: (e, {baseFunc}) => {
                                    baseFunc();
                                    table.clearFocused()
                                },
                                onFocus: () => !isFocused && table.setFocused({ cell: { columnKey: column.key, rowKeyValue } }),
                            }
                        },
                    },
                    pagingIndex: {
                        elementAttributes: (props) => ({
                            tabIndex: 0,
                            onKeyUp: (e) => e.keyCode === 13 && table.updatePageIndex(props.pageIndex)
                        }),
                    },
                    headCell: {
                        elementAttributes: (props) => ({
                            tabIndex: 0,
                            onKeyUp: (e) => e.keyCode === 13 && table.updateSortDirection(props.column.key)
                        }),
                    },
                }}
            />
        </div>
    );
};

export default KeyboardNavigationDemo;
