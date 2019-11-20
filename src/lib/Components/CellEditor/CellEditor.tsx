import * as React from 'react';

import { Column } from '../../Models/Column';
import { EventFunc, ValueChangeFunc } from '../../types';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface ICellEditorProps {
  column: Column;
  rowData: any;
  rowKey: string;
  isSelectedRow: boolean;
  onEvent: EventFunc;
  onValueChange: ValueChangeFunc;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { editor } = props.column;
  return editor ? editor(props) :  <CellEditorState {...props}/>;
};

export default CellEditor;
