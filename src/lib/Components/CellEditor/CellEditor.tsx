import * as React from 'react';

import { ActionType, EditingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc, Field } from '../../types';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
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
    return <CellEditorState {...props} autoFocus={true}/>;
  }

  const dispatchHandler: DispatchFunc = (action: any) => {
    if (action.type !== ActionType.CloseEditor) {
      dispatch(action);
    }
  };
  return <CellEditorDataType {...props} dispatch={dispatchHandler} />;
};

export default CellEditor;
