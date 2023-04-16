import * as React from 'react';

import { EditingMode } from '../../enums';
import { ICellTextProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { openEditor } from '../../actionCreators';

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

  const formatedValue =
    (format && format({ column, value }))
    || value?.toString();

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.cellText,
    onClick: () => {
      if (editingMode === 'cell') {
        dispatch(openEditor(rowKeyValue, column.key));
      }
    },
  }, props, childComponents.cellText);

  return (
    <div {...elementAttributes}>{content || formatedValue || <>&nbsp;</>}</div>
  );
};

export default CellText;
