import React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  onChangeToText,
  onValueChange,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      type='text'
      value={value}
      onChange={onValueChange}
      onBlur={onChangeToText}/>
  );
};

export default CellEditorString;
