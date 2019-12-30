import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { Cell } from '../../models';
import { getDateInputValue } from '../../Utils/DateUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  field,
  rowData,
  rowKeyField,
}) => {
  const fieldValue = rowData[field];
  const value = fieldValue && getDateInputValue(fieldValue);
  return (
    <input
      autoFocus={true}
      className={defaultOptions.css.dateInput}
      type='date'
      value={value || ''}
      onChange={(event) => {
        const targetValue: string = event.currentTarget.value;
        dispatch(ActionType.ChangeRowData, {newValue: {...rowData, [field]: targetValue ? new Date(targetValue) : null}});
      }}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(ActionType.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorDate;
