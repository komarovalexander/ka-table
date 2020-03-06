import * as React from 'react';

import { ActionType, EditingMode } from '../../enums';
import { Cell } from '../../models';
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
    value,
  } = props;

  const formatedValue = format ? format(value) : !isEmpty(value) && value.toString();

  const componentProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'ka-cell-text',
    onClick: () => {
      if (editingMode === EditingMode.Cell) {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch({ type: ActionType.OpenEditor, cell });
      }
    },
  };

  const divProps = extendProps(componentProps, props, childAttributes.cell, props.dispatch);
  return (
    <div {...divProps}>{formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;
