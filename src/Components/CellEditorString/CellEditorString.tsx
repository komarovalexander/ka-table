import React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column, rowData, close, onValueChange,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      type='text'
      value={value}
      onChange={(event) => onValueChange(event.currentTarget.value)}
      onBlur={close}/>
  );
};

export default CellEditorString;
