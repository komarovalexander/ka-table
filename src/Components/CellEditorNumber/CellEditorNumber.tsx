import React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  onChangeToText,
  onValueChange,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      type='number'
      value={value}
      onChange={(event) => onValueChange(event.currentTarget.value)}
      onBlur={onChangeToText}/>
  );
};

export default CellEditorNumber;
