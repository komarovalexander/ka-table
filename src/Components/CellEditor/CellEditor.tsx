import * as React from 'react';

import { DataType } from '../../Enums/DataType';
import { Column } from '../../Models/Column';
import { ValueChangeFunc } from '../../Types/ValueChangeFunction';
import CellEditorNumber from '../CellEditorNumber/CellEditorNumber';
import CellEditorString from '../CellEditorString/CellEditorString';

export interface ICellEditorProps {
  column: Column;
  rowData: any;
  onChangeToText: () => void;
  onValueChange: ValueChangeFunc;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { dataType } = props.column;
  switch (dataType) {
    case DataType.String: return <CellEditorString {...props}/>;
    case DataType.Number: return <CellEditorNumber {...props}/>;
    default: return <div>{dataType}</div>;
  }
};

export default CellEditor;
