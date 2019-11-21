import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { getRowValueByColumn } from '../../Utils/RowUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = ({
  column,
  onEvent,
  onValueChange,
  rowData,
  rowKeyField,
}) => {
  const value = getRowValueByColumn(rowData, column);
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
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        onEvent(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorNumber;
