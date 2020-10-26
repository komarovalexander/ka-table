import React, { useState } from 'react';

import { ITableAllProps, ITableProps, kaReducer, Table } from '../../lib';
import { hideColumn, showColumn } from '../../lib/actionCreators';
import CellEditorBoolean from '../../lib/Components/CellEditorBoolean/CellEditorBoolean';
import { ActionType, DataType, EditingMode, SortingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    column5: `column:5 row:${index}`,
    column6: `column:6 row:${index}`,
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String, visible: false },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: 'column5', title: 'Column 5', dataType: DataType.String },
    { key: 'column6', title: 'Column 6', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const ColumnSettings: React.FC<ITableAllProps> = (tableProps: ITableAllProps) => {
  const columnsSettingsProps: ITableProps = {
    data: tableProps.columns.map(c => ({...c, visible: c.visible !== false })),
    rowKeyField: 'key',
    columns: [{
      key: 'title',
      isEditable: false,
      title: 'Field',
      dataType: DataType.String
    }, {
      key: 'visible',
      title: 'Visible',
      isEditable: false,
      style: { width: 45 },
      dataType: DataType.Boolean
    }],
    editingMode: EditingMode.None,
  }
  const dispatchSettings: DispatchFunc = (action) => {
    if (action.type === ActionType.UpdateCellValue){
      tableProps.dispatch(action.value ? showColumn(action.rowKeyValue) : hideColumn(action.rowKeyValue));
    }
  };
  return (
    <Table
      {...columnsSettingsProps}
      childComponents={{
        rootDiv: { elementAttributes: () => ({style: {width: 400, marginBottom: 20}})},
        cell: {
          content: (props) => {
            switch (props.column.key){
              case 'visible': return <CellEditorBoolean {...props}/>;
            }
          }
        }
      }}
      dispatch={dispatchSettings}
    />
  );
}

const ColumnSettingsDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState<ITableProps>(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <div className='column-settings-demo'>
      <ColumnSettings
        {...tableProps}
        dispatch={dispatch}
      />
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default ColumnSettingsDemo;