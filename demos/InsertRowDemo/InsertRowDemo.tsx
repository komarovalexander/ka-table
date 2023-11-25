import React from 'react';

import { DataType, Table, useTable } from 'ka-table';
import { EditingMode, InsertRowPosition } from 'ka-table/enums';

const dataArray = Array(7).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 rowId:${index}`,
        column2: `column:2 rowId:${index}`,
        column3: `column:3 rowId:${index}`,
        id: index,
    }),
);

let maxValue = Math.max(...dataArray.map(i => i.id));
const generateNewId = () => {
    maxValue++;
    return maxValue;
};

const InsertRowDemo: React.FC = () => {
    const table = useTable();

    return (
        <div className='add-row-demo'>
            <Table
                table={table}
                columns={[
                    {
                        key: 'column1',
                        title: 'Column 1',
                        dataType: DataType.String
                    },
                    { key: 'column2', title: 'Column 2', dataType: DataType.String },
                    { key: 'column3', title: 'Column 3', dataType: DataType.String },
                    {
                        key: 'insertRowBeforeColumn',
                        width: 200
                    },
                    {
                        key: 'insertRowAfterColumn',
                        width: 200
                    },
                ]}
                editingMode={EditingMode.Cell}
                data={dataArray}
                rowKeyField={'id'}
                childComponents={{
                    cell: {
                        content: (props) => {
                            if (props.column.key === 'insertRowBeforeColumn'){
                                return (
                                    <button onClick={() => {
                                        const id = generateNewId();
                                        const newRow = {
                                            id,
                                            column1: `column:1 rowId:${id}`,
                                        };
                                        table.insertRow(newRow, { rowKeyValue: props.rowKeyValue })
                                    }}>
                    Insert Row Before
                                    </button>
                                );
                            }
                            if (props.column.key === 'insertRowAfterColumn'){
                                return (
                                    <button onClick={() => {
                                        const id = generateNewId();
                                        const newRow = {
                                            id,
                                            column1: `column:1 rowId:${id}`,
                                        };
                                        table.insertRow(newRow, { rowKeyValue: props.rowKeyValue, insertRowPosition: InsertRowPosition.after })
                                    }}>
                    Insert Row After
                                    </button>
                                );
                            }
                        }
                    },
                }}
            />
        </div>
    );
};

export default InsertRowDemo;
