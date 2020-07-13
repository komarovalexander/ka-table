import * as React from 'react';

import { EditingMode } from '../../enums';
import { ChildComponents, Column } from '../../models';
import { DispatchFunc, Field, FormatFunc } from '../../types';
import CellText from '../CellText/CellText';

export interface ICellContentProps {
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

const CellContent: React.FunctionComponent<ICellContentProps> = (props) => {
  const { childComponents: { cellText } } = props;
  const cellContent = cellText && cellText.content && cellText.content(props);
  return cellContent || <CellText {...props}/>;
};

export default CellContent;
