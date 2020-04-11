import React from 'react';

import { closeEditor, updateCellValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../CellEditor/CellEditor';

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
      className={defaultOptions.css.textInput}
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
