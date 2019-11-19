import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = ({
  column,
  onEvent,
  onValueChange,
  rowData,
  rowKey,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      className={defaultOptions.css.numberInput}
      type='number'
      value={value || ''}
      onChange={(event) => {
        const newValue = event.currentTarget.value;
        onValueChange(Number(newValue) || null);
      }}
      onBlur={() => {
        const cell: Cell = { field: column.field, rowKeyValue: rowData[rowKey] };
        onEvent(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorNumber;
