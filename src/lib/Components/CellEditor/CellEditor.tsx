import * as React from 'react';

import { Column } from '../../Models/Column';
import { DispatchFunc, Field } from '../../types';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface IFilterRowEditorProps {
  column: Column;
  dispatch: DispatchFunc;
}

export interface ICellEditorProps extends IFilterRowEditorProps {
  field: Field;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  value: any;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { editor } = props.column;
  return editor ? editor(props) :  <CellEditorState {...props}/>;
};

export default CellEditor;
