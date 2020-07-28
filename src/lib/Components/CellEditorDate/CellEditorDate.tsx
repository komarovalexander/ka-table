import React from 'react';

import { closeEditor, updateCellValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../../props';
import { getDateInputValue } from '../../Utils/DateUtils';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  rowKeyValue,
  value,
  autoFocus
}) => {
  const inputValue = value && getDateInputValue(value);
  return (
    <input
      autoFocus={autoFocus}
      className={defaultOptions.css.dateInput}
      type='date'
      value={inputValue || ''}
      onChange={(event) => {
        const targetValue: string = event.currentTarget.value;
        const newValue = targetValue ? new Date(targetValue) : null;
        dispatch(updateCellValue(rowKeyValue, column.key, newValue));
      }}
      onBlur={() => {
        dispatch(closeEditor(rowKeyValue, column.key));
      }}
    />
  );
};

export default CellEditorDate;
