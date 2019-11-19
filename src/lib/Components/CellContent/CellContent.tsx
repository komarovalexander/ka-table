import * as React from 'react';

import { Column } from '../../Models/Column';
import { EventFunc } from '../../types';
import CellText from '../CellText/CellText';

export interface ICellContentProps {
  column: Column;
  rowData: any;
  rowKey: string;
  onEvent: EventFunc;
}

const CellContent: React.FunctionComponent<ICellContentProps> = (props) => {
  const { column: { cell } } = props;
  return cell ? cell(props) :  <CellText {...props}/>;
};

export default CellContent;
