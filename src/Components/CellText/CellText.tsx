import './CellText.scss';

import * as React from 'react';

import { Column } from '../../Models/Column';

export interface ICellTextProps {
  column: Column;
  onChangeToEditor: () => void;
  rowData: any;
}

const CellText: React.FunctionComponent<ICellTextProps> = ({
  column,
  rowData,
  onChangeToEditor,
}) => {
  const value = rowData[column.field];
  return (
    <div className='tc-cell-text'
      onClick={onChangeToEditor}
    >{value ? value : <span>&nbsp;</span>}</div>
  );
};

export default CellText;
