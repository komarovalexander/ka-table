import * as React from 'react';

import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import CellText from '../CellText/CellText';

export interface ICellContentProps {
  column: Column;
  field: string;
  rowData: any;
  rowKeyField: string;
  dispatch: DispatchFunc;
}

const CellContent: React.FunctionComponent<ICellContentProps> = (props) => {
  const { column: { cell } } = props;
  return cell ? cell(props) :  <CellText {...props}/>;
};

export default CellContent;
