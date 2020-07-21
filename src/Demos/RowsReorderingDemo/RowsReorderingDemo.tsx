import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { ActionType, DataType, EditingMode } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';

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
    { key: 'drag', style: { width: 15 }, isEditable: false, title: '' },
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  rowReordering: true,
};

const columnChooserReducer = (props: ITableProps, action: any): ITableProps => {
  const { data = [] } = props;
  switch (action.type){
    case ActionType.ReorderRows:
      const movedRow = data.find(d => d[props.rowKeyField] === action.rowKeyValue);
      const newData = data.filter(d => d[props.rowKeyField] !== movedRow[props.rowKeyField]);
      const targetRowIndex = data.findIndex(d => d[props.rowKeyField] === action.targetRowKeyValue);
      newData.splice(targetRowIndex, 0, movedRow)
      return {...props, data: newData};
  }
  return kaReducer(props, action);
}

const RowsReorderingDemo: React.FC = () => {
  const [columnChooserProps, changeColumnChooserProps] = useState<ITableProps>(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeColumnChooserProps((prevState: ITableProps) => columnChooserReducer(prevState, action));
  };
  return (
    <div className='rows-reordering-demo'>
      <Table
        {...columnChooserProps}
        childComponents={{
          cell: {
            content: (props) => {
              switch (props.column.key){
                case 'drag': return <img style={{cursor: 'move'}} src='static/icons/draggable.svg' alt='draggable' />;
              }
            }
          }
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export default RowsReorderingDemo;
