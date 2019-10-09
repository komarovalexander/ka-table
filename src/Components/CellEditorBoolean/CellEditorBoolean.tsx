import React from 'react';

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
      type='checkbox'
      checked={value}
      value={value}
      onChange={(event) => onValueChange(event.currentTarget.checked)}
      onBlur={close}/>
  );
};

export default CellEditorBoolean;
