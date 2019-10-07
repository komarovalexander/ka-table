import * as React from 'react';

import { ValueChangeFunc } from '../../Types/ValueChangeFunction';

export interface ICellEditorProps {
  field: string;
  rowData: any;
  onChangeToText: () => void;
  onValueChange: ValueChangeFunc;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = ({
  field,
  rowData,
  onChangeToText,
  onValueChange,
}) => {
  const value = rowData[field];
  return (
    <input autoFocus={true} type='text'
      value={value}
      onChange={onValueChange}
      onBlur={onChangeToText}/>
  );
};

export default CellEditor;
