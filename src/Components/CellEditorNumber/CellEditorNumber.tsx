import React from 'react';

import defaultOptions from '../../Models/DefaultOptions';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  close,
  onValueChange,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      className={defaultOptions.css.numberInput}
      type='number'
      value={value || ''}
      onChange={(event) => {
        const newValue = event.currentTarget.value;
        onValueChange(Number(newValue) || null);
      }}
      onBlur={close}/>
  );
};

export default CellEditorNumber;
