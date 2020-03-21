import React from 'react';

import { closeEditor, updateCellValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { getDateInputValue } from '../../Utils/DateUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  rowKeyValue,
  value,
}) => {
  const inputValue = value && getDateInputValue(value);
  return (
    <input
      autoFocus={true}
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
