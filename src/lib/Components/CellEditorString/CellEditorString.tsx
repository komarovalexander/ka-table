import React from 'react';

import { changeCellValue, closeEditor } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  value,
  rowKeyValue,
}) => {
  return (
    <input autoFocus={true}
      type='text'
      className={defaultOptions.css.textInput}
      value={value || ''}
      onChange={(event) => {
        dispatch(changeCellValue(rowKeyValue, column.key, event.currentTarget.value));
      }}
      onBlur={() => {
        dispatch(closeEditor(rowKeyValue, column.key));
      }}
    />
  );
};

export default CellEditorString;
