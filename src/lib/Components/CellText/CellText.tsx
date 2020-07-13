import * as React from 'react';

import { openEditor } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { isEmpty } from '../../Utils/CommonUtils';
import { extendProps } from '../../Utils/PropsUtils';
import { ICellContentProps } from '../CellContent/CellContent';

const CellText: React.FunctionComponent<ICellContentProps> = (props) => {
  const {
    childComponents,
    column,
    format,
    dispatch,
    editingMode,
    rowKeyValue,
    value,
  } = props;

  let formatedValue = format && format({ column, value });
  formatedValue = formatedValue || (!isEmpty(value) && value.toString());

  const componentProps: React.HTMLAttributes<HTMLDivElement> = {
    className: defaultOptions.css.cellText,
    onClick: () => {
      if (editingMode === EditingMode.Cell) {
        dispatch(openEditor(rowKeyValue, column.key));
      }
    },
  };

  const divProps = extendProps(componentProps, props, childComponents.cellText);
  return (
    <div {...divProps}>{formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;
