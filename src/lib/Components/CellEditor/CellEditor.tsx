import * as React from 'react';

import { updateEditorValue } from '../../actionCreators';
import { ActionType, EditingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc, Field } from '../../types';
import CellEditorState from '../CellEditorState/CellEditorState';
import CellEditorValidation from '../CellEditorValidation/CellEditorValidation';

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
    return <CellEditorState {...props} autoFocus={true}/>;
  }

  const dispatchHandler: DispatchFunc = (action: any) => {
    if (action.type === ActionType.UpdateCellValue) {
      dispatch(updateEditorValue(action.rowKeyValue, action.columnKey, action.value, { validate: true }));
    } else if (action.type !== ActionType.CloseEditor) {
      dispatch(action);
    }
  };
  return <CellEditorValidation {...props} dispatch={dispatchHandler} />;
};

export default CellEditor;
