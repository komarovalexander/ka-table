import React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorBoolean: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  onChangeToText,
  onValueChange,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      type='checkbox'
      checked={value}
      value={value}
      onChange={onValueChange}
      onBlur={onChangeToText}/>
  );
};

export default CellEditorBoolean;
