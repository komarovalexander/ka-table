import * as React from 'react';

import { DataType } from '../../Enums/DataType';
import { Column } from '../../Models/Column';
import { ValueChangeFunc } from '../../Types/ValueChangeFunction';
import CellEditorBoolean from '../CellEditorBoolean/CellEditorBoolean';
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
    case DataType.Boolean: return <CellEditorBoolean {...props}/>;
    case DataType.Number: return <CellEditorNumber {...props}/>;
    default: return <CellEditorString {...props}/>;
  }
};

export default CellEditor;
