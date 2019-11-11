import * as React from 'react';

import { Column } from '../../Models/Column';
import CellText from '../CellText/CellText';

export interface ICellContentProps {
  column: Column;
  openEditor?: () => void;
  rowData: any;
}

const CellContent: React.FunctionComponent<ICellContentProps> = (props) => {
  const { column: { cell } } = props;
  return cell ? cell(props) :  <CellText {...props}/>;
};

export default CellContent;
