import * as React from 'react';

export interface ICellTextProps {
  field: string;
  onChangeToEditor: () => void;
  rowData: any;
}

const CellText: React.FunctionComponent<ICellTextProps> = ({
  field,
  rowData,
  onChangeToEditor,
}) => {
  const value = rowData[field];
  return (
    <div
      onClick={onChangeToEditor}
    >{value}</div>
  );
};

export default CellText;
