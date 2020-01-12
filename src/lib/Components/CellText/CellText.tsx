import * as React from 'react';

import { ActionType, EditingMode } from '../../enums';
import { Cell } from '../../models';
import { getField } from '../../Utils/ColumnUtils';
import { isEmpty } from '../../Utils/CommonUtils';
import { extendProps } from '../../Utils/PropsUtils';
import { ICellContentProps } from '../CellContent/CellContent';

const CellText: React.FunctionComponent<ICellContentProps> = (props) => {
  const {
    childAttributes,
    column,
    column: { format },
    dispatch,
    editingMode,
    rowData,
    rowKeyField,
  } = props;

  const field = getField(column);
  const value = rowData[field];
  const formatedValue = format ? format(value) : !isEmpty(value) && value.toString();

  const componentProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'ka-cell-text',
    onClick: () => {
      if (editingMode === EditingMode.Cell) {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(ActionType.OpenEditor, { cell });
      }
    },
  };

  const divProps = extendProps(componentProps, props, childAttributes.cell, props.dispatch);
  return (
    <div {...divProps}>{formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;
