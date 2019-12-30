import * as React from 'react';

import { Column } from '../../Models/Column';
import { EventFunc } from '../../types';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface IFilterRowEditorProps {
  column: Column;
  dispatch: EventFunc;
}

export interface ICellEditorProps extends IFilterRowEditorProps {
  rowKeyField: string;
  rowData: any;
  field: string;
  isSelectedRow: boolean;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { editor } = props.column;
  return editor ? editor(props) :  <CellEditorState {...props}/>;
};

export default CellEditor;
