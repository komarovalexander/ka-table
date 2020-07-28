import React from 'react';

import { kaDefaultOptions } from '../../';
import { closeEditor, updateCellValue } from '../../actionCreators';
import { ICellEditorProps } from '../../props';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  value,
  rowKeyValue,
  autoFocus
}) => {
  return (
    <input
      autoFocus={autoFocus}
      type='text'
      className={kaDefaultOptions.css.textInput}
      value={value || ''}
      onChange={(event) => {
        dispatch(updateCellValue(rowKeyValue, column.key, event.currentTarget.value));
      }}
      onBlur={() => {
        dispatch(closeEditor(rowKeyValue, column.key));
      }}
    />
  );
};

export default CellEditorString;
