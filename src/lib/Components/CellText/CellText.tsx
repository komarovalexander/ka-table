import * as React from 'react';

import { openEditor } from '../../actionCreators';
import { EditingMode } from '../../enums';
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
    rowKeyValue,
    value,
  } = props;

  const formatedValue = format ? format(value) : !isEmpty(value) && value.toString();

  const componentProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'ka-cell-text',
    onClick: () => {
      if (editingMode === EditingMode.Cell) {
        dispatch(openEditor(rowKeyValue, column.key));
      }
    },
  };

  const divProps = extendProps(componentProps, props, childAttributes.cell, props.dispatch);
  return (
    <div {...divProps}>{formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;
