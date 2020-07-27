import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import CellEditorBoolean from '../../lib/Components/CellEditorBoolean/CellEditorBoolean';
import { DataType, EditingMode, SortingMode } from '../../lib/enums';
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
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: 'column5', title: 'Column 5', dataType: DataType.String },
    { key: 'column6', title: 'Column 6', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const columnsSettingsPropsInit: ITableProps = {
  data: tablePropsInit.columns.map(c => ({...c, visible: true })),
  rowKeyField: 'key',
  columns: [{
    key: 'drag',
    style: { width: 15 },
    isEditable: false,
    title: ''
  }, {
    key: 'title',
    isEditable: false,
    title: 'Field'
  }, {
    key: 'visible',
    title: 'Show',
    style: { width: 45 },
    dataType: DataType.Boolean
  }],
  rowReordering: true,
  editingMode: EditingMode.Cell,
}

const DraggableIcon: React.FC = () => {
  return (
    <img style={{cursor: 'move'}} src='static/icons/draggable.svg' alt='draggable' />
  );
};

const ColumnSettingsDemo: React.FC = () => {
  const [columnsSettingsProps, changeColumnChooserProps] = useState<ITableProps>(columnsSettingsPropsInit);
  const [tableProps, changeTableProps] = useState<ITableProps>(tablePropsInit);
  const dispatchSettings: DispatchFunc = (action) => {
    changeColumnChooserProps((prevState: ITableProps) => {
      const newSettingsProps = kaReducer(prevState, action);
      const newTableProps = { ...tableProps, columns: newSettingsProps.data.filter((d: any) => d.visible) };
      changeTableProps(newTableProps);
      return newSettingsProps;
    });
  };
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <div className='column-settings-demo'>
      <Table
        {...columnsSettingsProps}
        childComponents={{
          rootDiv: { elementAttributes: () => ({style: {width: 400, marginBottom: 20}})},
          cell: {
            content: (props) => {
              switch (props.column.key){
                case 'drag': return <DraggableIcon/>;
                case 'visible': return <CellEditorBoolean {...props}/>;
              }
            }
          }
        }}
        dispatch={dispatchSettings}
      />
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </div>
  );
};

export default ColumnSettingsDemo;
