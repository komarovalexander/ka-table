import { ActionType, DataType, EditingMode, SortingMode } from '../../lib/enums';
import { ITableInstance, Table, useTable } from '../../lib';
import React, { useState } from 'react';

import CellEditorBoolean from '../../lib/Components/CellEditorBoolean/CellEditorBoolean';

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

const ColumnSettings = ({ table }: { table: ITableInstance }) => {
  const [data, setData] = useState<any[]>();
  const updateData = () => setData(table?.props?.columns?.map((c) => ({ ...c, visible: c.visible !== false })));
  const settingsTable = useTable({
    onDispatch: (action) => {
      if (action.type === ActionType.UpdateCellValue) {
        action.value ? table.showColumn(action.rowKeyValue) : table.hideColumn(action.rowKeyValue);
        updateData();
      }
      if (action.type === ActionType.ComponentDidMount) {
        updateData();
      }
    },
  });
  return (
    <Table
      table={settingsTable}
      rowKeyField={'key'}
      data={data}
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
  return (
    <div className='column-settings-demo'>
      <ColumnSettings table={table} />
      <Table
        table={table}
        columns={[
          { key: 'column1', title: 'Column 1', dataType: DataType.String },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String, visible: false },
          { key: 'column4', title: 'Column 4', dataType: DataType.String },
          { key: 'column5', title: 'Column 5', dataType: DataType.String },
          { key: 'column6', title: 'Column 6', dataType: DataType.String },
        ]}
        data={dataArray}
        editingMode={'cell'}
        rowKeyField={'id'}
        sortingMode={SortingMode.Single}
      />
    </div>
  );
};

export default ColumnSettingsDemo;
