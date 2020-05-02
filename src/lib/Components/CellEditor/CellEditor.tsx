import * as React from 'react';

import { updateCellValue } from '../../actionCreators';
import { ActionType, EditingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc, Field } from '../../types';
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
    const dispatchHandler: DispatchFunc = (action: any) => {
      if (action.type === ActionType.UpdateEditorValue) {
        dispatch(updateCellValue(action.rowKeyValue, action.columnKey, action.value));
      } else {
        dispatch(action);
      }
    };
    return <CellEditorState {...props} dispatch={dispatchHandler} autoFocus={true}/>;
  } else {
    const dispatchHandler: DispatchFunc = (action: any) => {
      if (action.type !== ActionType.CloseEditor) {
        dispatch(action);
      }
    };
    return <CellEditorState {...props} dispatch={dispatchHandler} />;
  }
};

export default CellEditor;
