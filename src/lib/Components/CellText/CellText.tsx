import * as React from 'react';

import { kaDefaultOptions } from '../../';
import { openEditor } from '../../actionCreators';
import { EditingMode } from '../../enums';
import { ICellTextProps } from '../../props';
import { isEmpty } from '../../Utils/CommonUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const CellText: React.FunctionComponent<ICellTextProps> = (props) => {
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

  const { elementAttributes, content } = getElementCustomization({
    className: kaDefaultOptions.css.cellText,
    onClick: () => {
      if (editingMode === EditingMode.Cell) {
        dispatch(openEditor(rowKeyValue, column.key));
      }
    },
  }, props, childComponents.cellText);

  return (
    <div {...elementAttributes}>{content || formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;
