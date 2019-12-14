import * as React from 'react';

import { Events } from '../../enums';
import { Cell } from '../../models';
import { isEmpty } from '../../Utils/CommonUtils';
import { getRowValueByColumn } from '../../Utils/RowUtils';
import { ICellContentProps } from '../CellContent/CellContent';

const CellText: React.FunctionComponent<ICellContentProps> = ({
  column: { format },
  column,
  rowData,
  rowKeyField,
  dispatch,
}) => {
  const value = getRowValueByColumn(rowData, column);
  const formatedValue = format ? format(value) : !isEmpty(value) && value.toString();
  return (
    <div className='ka-cell-text'
      onClick={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(Events.OpenEditor, { cell });
      }}
    >{formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;