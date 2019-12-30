import * as React from 'react';

import { Column } from '../../Models/Column';
import { EventFunc } from '../../types';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface IFilterRowEditor {
  column: Column;
  field: string;
  dispatch: EventFunc;
}

export interface ICellEditorProps extends IFilterRowEditor {
  rowKeyField: string;
  rowData: any;
  isSelectedRow: boolean;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { editor } = props.column;
  return editor ? editor(props) :  <CellEditorState {...props}/>;
};

export default CellEditor;
