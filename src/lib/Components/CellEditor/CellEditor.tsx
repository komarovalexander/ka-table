import * as React from 'react';

import { EditingMode } from '../../enums';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { DispatchFunc, Field, ValidationFunc } from '../../types';
import { getCellEditorDispatchHandler } from '../../Utils/CellUtils';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface IFilterRowEditorProps {
  childComponents: ChildComponents;
  column: Column;
  dispatch: DispatchFunc;
}

export interface ICellEditorProps extends IFilterRowEditorProps {
  autoFocus?: boolean;
  editingMode: EditingMode;
  editorValue?: any;
  field: Field;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  value: any;
  validationMessage?: string;
  validation?: ValidationFunc;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    childComponents: {editor},
    dispatch,
    editingMode
  } = props;
  const editorContent = editor && editor.content && editor.content(props);
  if (editorContent){
    return editorContent;
  }
  if (editingMode === EditingMode.Cell){
    const dispatchHandler = getCellEditorDispatchHandler(dispatch);
    return <CellEditorState {...props} dispatch={dispatchHandler} autoFocus={true}/>;
  }
  return <CellEditorState {...props} />;
};

export default CellEditor;
