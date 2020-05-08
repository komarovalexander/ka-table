import * as React from 'react';

import { EditingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc, Field } from '../../types';
import { getCellEditorDispatchHandler } from '../../Utils/CellUtils';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface IFilterRowEditorProps {
  column: Column;
  dispatch: DispatchFunc;
}

export interface ICellEditorProps extends IFilterRowEditorProps {
  autoFocus?: boolean;
  editingMode: EditingMode;
  editorValue?: any;
  field: Field;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  value: any;
  validationMessage?: string;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column: {editor},
    dispatch,
    editingMode
  } = props;
  if (editor){
    return editor(props);
  }
  if (editingMode === EditingMode.Cell){
    const dispatchHandler = getCellEditorDispatchHandler(dispatch);
    return <CellEditorState {...props} dispatch={dispatchHandler} autoFocus={true}/>;
  }
  return <CellEditorState {...props} />;
};

export default CellEditor;
