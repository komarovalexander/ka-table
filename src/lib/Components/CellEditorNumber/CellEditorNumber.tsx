import React from 'react';

import { closeEditor, updateCellValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../../props';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  value,
  rowKeyValue,
  autoFocus
}) => {
  return (
    <input
      autoFocus={autoFocus}
      className={defaultOptions.css.numberInput}
      type='number'
      value={value === null || value === undefined ? '' : value}
      onChange={(event) => {
        const newValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
        dispatch(updateCellValue(rowKeyValue, column.key, newValue));
      }}
      onBlur={() => {
        dispatch(closeEditor(rowKeyValue, column.key));
      }}
    />
  );
};

export default CellEditorNumber;
