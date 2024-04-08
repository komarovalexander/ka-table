import { DataType, Table } from 'ka-table';
import { openEditor, updateSortDirection } from 'ka-table/actionCreators';

import CellEditorString from 'ka-table/Components/CellEditorString/CellEditorString';
import React from 'react';
import { SortingMode } from 'ka-table/enums';
import useKaFocusRef from './hook';

const dataArray = Array(10).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);

const TabIndexDemo = () => {
    const kaFocusRef = useKaFocusRef({
        columnKey: 'column2',
        rowKeyValue: 2
    });

    return (
        <>
            <p style={{fontSize: 12}}>Use <i>Tab</i> to navigate between cells. Press <i>Enter</i> - to start/stop editing cells, or sort column in case of header cell.</p>
            <Table
                columns= {[
                    { key: 'column1', title: 'Column 1', dataType: DataType.String },
                    { key: 'column2', title: 'Column 2', dataType: DataType.String },
                    { key: 'column3', title: 'Column 3', dataType: DataType.String },
                    { key: 'column4', title: 'Column 4', dataType: DataType.String },
                ]}
                data={dataArray}
                rowKeyField={'id'}
                sortingMode={SortingMode.Single}
                childComponents={{
                    headCell: {
                        elementAttributes: (props) => ({
                            tabIndex: 0,
                            onKeyUp: (e) => {
                                if (e.key === 'Enter') {
                                    props.dispatch(updateSortDirection(props.column.key));
                                }
                            }
                        })
                    },
                    cell: {
                        elementAttributes: (props) => ({
                            tabIndex: 0,
                            ref: kaFocusRef({
                                rowKeyValue: props.rowKeyValue,
                                columnKey: props.column.key
                            }),
                            onKeyUp: (e) => {
                                if (e.key === 'Enter'){
                                    if (props.isEditableCell) {
                                        e.currentTarget.focus();
                                    }
                                    else {
                                        props.dispatch(openEditor(props.rowKeyValue, props.column.key));
                                    }
                                }
                            }
                        })
                    },
                    cellEditor: {
                        content: (props) => (
                            <CellEditorString {...props} autoFocus={true}/>
                        )
                    }
                }}
            />
        </>
    );
};

export default TabIndexDemo;
