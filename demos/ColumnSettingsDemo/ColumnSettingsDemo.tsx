import { ActionType, DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { ITableProps, Table, useTable } from 'ka-table';
import React, { useState } from 'react';

import CellEditorBoolean from 'ka-table/Components/CellEditorBoolean/CellEditorBoolean';

const dataArray = Array(10)
    .fill(undefined)
    .map((_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        column5: `column:5 row:${index}`,
        column6: `column:6 row:${index}`,
        id: index,
    }));

const ColumnSettings = ({ columns, onChange }: { columns: ITableProps['columns'], onChange: (columnKey: string, visible: boolean) => void }) => {
    const settingsTable = useTable({
        onDispatch: (action) => {
            if (action.type === ActionType.UpdateCellValue) {
                onChange(action.rowKeyValue, action.value);
            }
        },
    });
    return (
        <Table
            table={settingsTable}
            rowKeyField={'key'}
            data={columns?.map((c) => ({ ...c, visible: c.visible !== false }))}
            columns={[
                {
                    key: 'title',
                    isEditable: false,
                    title: 'Field',
                    dataType: DataType.String,
                },
                {
                    key: 'visible',
                    title: 'Visible',
                    isEditable: false,
                    style: { textAlign: 'center' },
                    width: 80,
                    dataType: DataType.Boolean,
                },
            ]}
            editingMode={EditingMode.None}
            childComponents={{
                rootDiv: { elementAttributes: () => ({ style: { width: 400, marginBottom: 20 } }) },
                cell: {
                    content: (props) => {
                        switch (props.column.key) {
                        case 'visible':
                            return <CellEditorBoolean {...props} />;
                        }
                    },
                },
            }}
        />
    );
};

const ColumnSettingsDemo: React.FC = () => {
    const table = useTable();
    const [columns] = useState([
        { key: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
        { key: 'column3', title: 'Column 3', dataType: DataType.String, visible: false },
        { key: 'column4', title: 'Column 4', dataType: DataType.String },
        { key: 'column5', title: 'Column 5', dataType: DataType.String },
        { key: 'column6', title: 'Column 6', dataType: DataType.String },
    ]);
    return (
        <div className='column-settings-demo'>
            <ColumnSettings columns={columns} onChange={(columnKey, visible) => {
                visible ? table.showColumn(columnKey) : table.hideColumn(columnKey);
            }} />
            <Table
                table={table}
                columns={columns}
                data={dataArray}
                editingMode={EditingMode.Cell}
                rowKeyField={'id'}
                sortingMode={SortingMode.Single}
            />
        </div>
    );
};

export default ColumnSettingsDemo;
