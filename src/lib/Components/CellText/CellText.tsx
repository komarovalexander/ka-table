import * as React from 'react';

import { Events } from '../../enums';
import { Cell } from '../../models';
import { isEmpty } from '../../Utils/CommonUtils';
import { ICellContentProps } from '../CellContent/CellContent';

const CellText: React.FunctionComponent<ICellContentProps> = ({
  column,
  rowData,
  rowKey,
  onEvent,
}) => {
  const value = rowData[column.field];
  return (
    <div className='tc-cell-text'
      onClick={() => {
        const cell: Cell = { field: column.field, rowKeyValue: rowData[rowKey] };
        onEvent(Events.OpenEditor, { cell });
      }}
    >{!isEmpty(value) ? value.toString() : <>&nbsp;</>}</div>
  );
};

export default CellText;
