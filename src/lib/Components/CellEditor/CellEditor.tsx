import * as React from 'react';

import { Column } from '../../Models/Column';
import { ValueChangeFunc } from '../../types';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface ICellEditorProps {
  column: Column;
  rowData: any;
  close: () => void;
  onValueChange: ValueChangeFunc;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { editor } = props.column;
  return editor ? editor(props) :  <CellEditorState {...props}/>;
};

export default CellEditor;
