import * as React from 'react';

import { EditingMode } from '../../enums';
import { ChildAttributes, Column } from '../../models';
import { DispatchFunc } from '../../types';
import CellText from '../CellText/CellText';

export interface ICellContentProps {
  childAttributes: ChildAttributes;
  column: Column;
  dispatch: DispatchFunc;
  editingMode: EditingMode;
  field: string;
  rowData: any;
  rowKeyField: string;
}

const CellContent: React.FunctionComponent<ICellContentProps> = (props) => {
  const { column: { cell } } = props;
  return cell ? cell(props) :  <CellText {...props}/>;
};

export default CellContent;
