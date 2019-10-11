import React from 'react';

import defaultOptions from '../../Models/DefaultOptions';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorBoolean: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  close,
  onValueChange,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      className={defaultOptions.css.checkbox}
      type='checkbox'
      defaultChecked={value}
      value={value}
      onChange={(event) => onValueChange(event.currentTarget.checked)}
      onBlur={close}/>
  );
};

export default CellEditorBoolean;
