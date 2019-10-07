import * as React from 'react';

export interface ICellEditorProps {
  changeToText: () => void;
  field: string;
  rowData: any;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = ({
  field,
  rowData,
  changeToText,
}) => {
  const value = rowData[field];
  return (
    <input autoFocus={true} type='text'
      value={value}
      onBlur={changeToText}/>
  );
};

export default CellEditor;
