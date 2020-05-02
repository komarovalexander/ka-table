import React, { useCallback, useEffect, useState } from 'react';

import { closeEditor, updateEditorValue } from '../../actionCreators';
import { ActionType, EditingMode } from '../../enums';
import { DispatchFunc } from '../../types';
import { replaceValue } from '../../Utils/DataUtils';
import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import { getValidationValue } from '../../Utils/Validation';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorValidation from '../CellEditorValidation/CellEditorValidation';

const CellEditorState: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column,
    rowData,
    rowKeyValue,
    dispatch,
    value,
    editingMode,
  } = props;
  let {
    validationMessage
  } = props;
  const [rowDataState, changeRowData] = useState(rowData);
  const [editorValueState, changeEditorValue] = useState(value);

  validationMessage = editingMode === EditingMode.Cell || validationMessage
    ? getValidationValue(editorValueState, rowDataState, column) || ''
    : validationMessage;
  const onValueStateChange = (action: any): void => {
    const newRowValue = replaceValue(rowData, column, action.value);
    changeRowData(newRowValue);
    changeEditorValue(action.value);
  };

  const close = useCallback(() => {
    dispatch(closeEditor(rowKeyValue, column.key));
  }, [dispatch, column, rowKeyValue]);

  const closeHandler = useCallback(() => {
    if (editingMode !== EditingMode.Cell || !validationMessage) {
      if (editorValueState !== value) {
        dispatch(updateEditorValue(rowKeyValue, column.key, editorValueState));
      }
      close();
    }
  }, [validationMessage, dispatch, close, column, editorValueState, rowKeyValue, value, editingMode]);

  useEffect(() => {
    return addEscEnterKeyEffect(close, closeHandler);
  }, [close, closeHandler]);

  const dispatchHandler: DispatchFunc = (action: any) => {
    if (action.type === ActionType.CloseEditor) {
      closeHandler();
    } else if (action.type === ActionType.UpdateCellValue) {
      onValueStateChange(action);
    } else {
      dispatch(action);
    }
  };

  const stateProps: ICellEditorProps = { ...props, ...{
    dispatch: dispatchHandler,
    value: editorValueState,
    editorValue: editorValueState,
    rowData: rowDataState,
    validationMessage: validationMessage || undefined
  }};

  return (
    <CellEditorValidation {...stateProps} />
  );
};

export default CellEditorState;
