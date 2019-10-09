import * as React from 'react';

import { isEmpty } from '../../Utils/CommonUtils';
import { ICellContentProps } from '../CellContent/CellContent';

const CellText: React.FunctionComponent<ICellContentProps> = ({
  column,
  rowData,
  openEditor,
}) => {
  const value = rowData[column.field];
  return (
    <div className='tc-cell-text'
      onClick={openEditor}
    >{!isEmpty(value) ? value.toString() : <>&nbsp;</>}</div>
  );
};

export default CellText;
