import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  onEvent,
  onValueChange,
  rowData,
  rowKey,
}) => {
  const fieldValue = rowData[column.field];
  const value = fieldValue && fieldValue.toISOString().split('T')[0];
  return (
    <input
      autoFocus={true}
      className={defaultOptions.css.dateInput}
      type='date'
      value={value || ''}
      onChange={(event) => {
        const targetValue: string = event.currentTarget.value;
        onValueChange(targetValue ? new Date(targetValue) : null);
      }}
      onBlur={() => {
        const cell: Cell = { field: column.field, rowKeyValue: rowData[rowKey] };
        onEvent(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorDate;
