import React from 'react';

import defaultOptions from '../../Models/DefaultOptions';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  close,
  onValueChange,
}) => {
  const fieldValue = rowData[column.field];
  const value = fieldValue && fieldValue.toISOString().split('T')[0];
  return (
    <input
      autoFocus={true}
      className={defaultOptions.css.dateInput}
      type='date'
      value={value || ''}
      onChange={(event) => {
        const targetValue: string = event.currentTarget.value;
        onValueChange(targetValue ? new Date(targetValue) : null);
      }}
      onBlur={close}/>
  );
};

export default CellEditorDate;
