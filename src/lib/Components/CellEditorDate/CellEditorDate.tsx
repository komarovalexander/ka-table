import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { getRowValueByColumn } from '../../Utils/RowUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  onValueChange,
  rowData,
  rowKeyField,
}) => {
  const fieldValue = getRowValueByColumn(rowData, column);
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
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorDate;
