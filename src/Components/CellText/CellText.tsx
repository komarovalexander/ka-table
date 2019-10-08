import './CellText.scss';

import * as React from 'react';

import { Column } from '../../Models/Column';
import { isEmpty } from '../../Utils/CommonUtils';

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
    >{!isEmpty(value) ? value.toString() : <span>&nbsp;</span>}</div>
  );
};

export default CellText;
