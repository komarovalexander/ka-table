import * as React from 'react';

import { Column } from '../../Models/Column';
import { EventFunc, ValueChangeFunc } from '../../types';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface ICellEditorProps {
  column: Column;
  field: string;
  rowData: any;
  rowKeyField: string;
  isSelectedRow: boolean;
  dispatch: EventFunc;
  onValueChange: ValueChangeFunc;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { editor } = props.column;
  return editor ? editor(props) :  <CellEditorState {...props}/>;
};

export default CellEditor;
