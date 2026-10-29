import { DataType, Table } from '../../lib';
import { EditingMode, SortingMode } from '../../lib/enums';

import React from 'react';

const dataArray = Array(100).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);

const KeyboardNavigationDemo = () => {
    return (
        <div className='keyboard-navigation-demo'>
            <p style={{ fontSize: 12 }}>
                <i>Tab</i> moves the focus into the table, <i>arrows</i> move it between the cells (with <i>Ctrl</i> to the last one),&nbsp;
                <i>Home</i> and <i>End</i> to the first and the last cell of the row (with <i>Ctrl</i> of the page),&nbsp;
                <i>PageUp</i> and <i>PageDown</i> change the page, <i>Enter</i> and <i>F2</i> edit the cell, <i>Esc</i> cancels editing.
            </p>
            <Table
                columns={[
                    { key: 'column1', title: 'Column 1', dataType: DataType.String },
                    { key: 'column2', title: 'Column 2', dataType: DataType.String },
                    { key: 'column3', title: 'Column 3', dataType: DataType.String },
                    { key: 'column4', title: 'Column 4', dataType: DataType.String },
                ]}
                data={dataArray}
                rowKeyField={'id'}
                sortingMode={SortingMode.Single}
                editingMode={EditingMode.Cell}
                paging={{
                    enabled: true,
                    pageIndex: 0,
                    pageSize: 10,
                }}
                // the keyboard navigation is enabled by default, Tab moves the focus to this cell
                focused={{
                    cell: {
                        columnKey: 'column4',
                        rowKeyValue: 2
                    }
                }}
            />
        </div>
    );
};

export default KeyboardNavigationDemo;
