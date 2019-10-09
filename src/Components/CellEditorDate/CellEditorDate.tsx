import React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  onChangeToText,
  onValueChange,
}) => {
  const fieldValue = rowData[column.field];
  const value = fieldValue && fieldValue.toISOString().split('T')[0];
  return (
    <input
      autoFocus={true}
      type='date'
      defaultValue={value}
      onChange={(event) => {
        const targetValue: string = event.currentTarget.value;
        onValueChange(targetValue ? new Date(targetValue) : null);
      }}
      onBlur={onChangeToText}/>
  );
};

export default CellEditorDate;
