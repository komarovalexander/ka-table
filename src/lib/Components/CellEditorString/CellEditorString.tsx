import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column, rowData, close, onValueChange,
}) => {
  const value = rowData[column.field] || '';
  return (
    <input autoFocus={true}
      type='text'
      className={defaultOptions.css.textInput}
      value={value || ''}
      onChange={(event) => onValueChange(event.currentTarget.value)}
      onBlur={close}/>
  );
};

export default CellEditorString;
