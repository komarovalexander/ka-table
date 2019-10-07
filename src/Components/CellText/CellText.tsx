import * as React from 'react';

export interface ICellTextProps {
  changeToEditor: () => void;
  field: string;
  rowData: any;
}

const CellText: React.FunctionComponent<ICellTextProps> = ({
  field,
  rowData,
  changeToEditor,
}) => {
  const value = rowData[field];
  return (
    <div
      onClick={changeToEditor}
    >{value}</div>
  );
};

export default CellText;
