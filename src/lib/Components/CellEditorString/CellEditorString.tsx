import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column,
  onEvent,
  onValueChange,
  rowData,
  rowKey,
}) => {
  const value = rowData[column.field] || '';
  return (
    <input autoFocus={true}
      type='text'
      className={defaultOptions.css.textInput}
      value={value || ''}
      onChange={(event) => onValueChange(event.currentTarget.value)}
      onBlur={() => {
        const cell: Cell = { field: column.field, rowKeyValue: rowData[rowKey] };
        onEvent(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorString;
