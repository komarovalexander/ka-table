import * as React from 'react';

interface ICellTextProps {
  field: string;
  rowData: any;
  changeToEditor: () => void;
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
