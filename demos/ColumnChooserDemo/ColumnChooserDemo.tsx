import './ColumnChooserDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import CellEditorBoolean from 'ka-table/Components/CellEditorBoolean/CellEditorBoolean';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
    { key: 'column5', title: 'Column 3', dataType: DataType.String },
    { key: 'column6', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const columnChooserPropsInit: ITableProps = {
  data: tablePropsInit.columns.map(c => ({...c, visible: true })),
  rowKeyField: 'key',
  columns: [{
    key: 'drag',
    style: { width: 40, cursor: 'move' },
    isEditable: false,
    title: ''
  }, {
    key: 'key',
    isEditable: false,
    title: 'Field'
  }, {
    key: 'visible',
    title: 'Show',
    dataType: DataType.Boolean
  }],
  editingMode: EditingMode.Cell,
}

const DraggableIcon: React.FC = () => {
  return (
    <img src='static/icons/draggable.svg' alt='draggable' />
  );
};


enum ColumnChooserActions {
  Reorder = 'Reorder',
};
const columnChooserReducer = (props: ITableProps, action: any): ITableProps => {
  const { data = [] } = props;
  switch (action.type){
    case ColumnChooserActions.Reorder:
      const movedRow = data.find(d => d.key === action.movedRowId);
      const newData = data.filter(d => d.key !== movedRow.key);
      const targetRowIndex = data.findIndex(d => d.key === action.targetRowId);
      newData.splice(targetRowIndex, 0, movedRow)
      return {...props, data: newData};
  }
  return kaReducer(props, action);
}

const ColumnChooserDemo: React.FC = () => {
  const [columnChooserProps, changeColumnChooserProps] = useState<ITableProps>(columnChooserPropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeColumnChooserProps((prevState: ITableProps) => columnChooserReducer(prevState, action));
  };
  const [draggedRow, changeDraggedRow] = useState();
  const [dragOverRow, changeDragOverRow] = useState();

  return (
    <Table
      {...columnChooserProps}
      childComponents={{
        dataRow: {
          elementAttributes: (props) => ({
            draggable: true,
            className: props.rowKeyValue === draggedRow ? 'dragged-row' : props.rowKeyValue === dragOverRow ? 'drag-over-row' : '' ,
            onDragStart: (event) => {
              event.dataTransfer.setData('rowId', props.rowKeyValue);
              changeDraggedRow(props.rowKeyValue);
            },
            onDragEnd: (event) => {
              changeDraggedRow(undefined);
              changeDragOverRow(undefined);
            },
            onDragOver: (event) => {
              changeDragOverRow(props.rowKeyValue);
              event.dataTransfer.effectAllowed = 'move';
              event.preventDefault();
            },
            onDrop: (event) => {
              const rowId = event.dataTransfer.getData('rowId');
              dispatch({
                type: ColumnChooserActions.Reorder,
                movedRowId: rowId,
                targetRowId: props.rowKeyValue
              });
            }
          })
        },
        cell: {
          content: (props) => {
            switch (props.column.key){
              case 'drag': return <DraggableIcon/>;
              case 'visible': return <CellEditorBoolean {...props}/>;
            }
          }
        }
      }}
      dispatch={dispatch}
    />
  );
};

export default ColumnChooserDemo;
