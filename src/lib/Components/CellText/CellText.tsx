import * as React from 'react';

import { openEditor } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildComponents, Column } from '../../models';
import { DispatchFunc, Field, FormatFunc } from '../../types';
import { isEmpty } from '../../Utils/CommonUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';

export interface ICellTextProps {
  childComponents: ChildComponents;
  column: Column;
  dispatch: DispatchFunc;
  editingMode: EditingMode;
  field: Field;
  format?: FormatFunc;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  value: any;
}

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
