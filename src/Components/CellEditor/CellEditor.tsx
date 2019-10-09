import * as React from 'react';

import { Column } from '../../Models/Column';
import { ValueChangeFunc } from '../../Types/ValueChangeFunction';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface ICellEditorProps {
  column: Column;
  rowData: any;
  onChangeToText: () => void;
  onValueChange: ValueChangeFunc;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { editor } = props.column;
  if (editor) {
    return editor(props);
  } else {
    return <CellEditorState {...props}/>;
  }
};

export default CellEditor;
