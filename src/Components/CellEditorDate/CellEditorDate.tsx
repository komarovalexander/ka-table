import React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  onChangeToText,
  onValueChange,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      type='date'
      value={value.toISOString().split('T')[0]}
      onChange={onValueChange}
      onBlur={onChangeToText}/>
  );
};

export default CellEditorDate;
