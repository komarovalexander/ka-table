import * as React from 'react';

import { Action } from '../../enums';
import { Cell } from '../../models';
import { getField } from '../../Utils/ColumnUtils';
import { isEmpty } from '../../Utils/CommonUtils';
import { ICellContentProps } from '../CellContent/CellContent';

const CellText: React.FunctionComponent<ICellContentProps> = ({
  column: { format },
  column,
  rowData,
  rowKeyField,
  dispatch,
}) => {
  const field = getField(column);
  const value = rowData[field];
  const formatedValue = format ? format(value) : !isEmpty(value) && value.toString();
  return (
    <div className='ka-cell-text'
      onClick={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(Action.OpenEditor, { cell });
      }}
    >{formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;
