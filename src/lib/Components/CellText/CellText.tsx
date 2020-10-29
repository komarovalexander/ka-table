import * as React from 'react';

import { openEditor } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { ICellTextProps } from '../../props';
import { isEmpty } from '../../Utils/CommonUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isCellEditingMode } from '../../Utils/EditingUtils';

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
    className: defaultOptions.css.cellText,
    onClick: () => {
      if (isCellEditingMode(editingMode)) {
        dispatch(openEditor(rowKeyValue, column.key));
      }
    },
  }, props, childComponents.cellText);

  return (
    <div {...elementAttributes}>{content || formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;
