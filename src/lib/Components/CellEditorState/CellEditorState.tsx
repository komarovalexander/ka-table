import React, { useCallback, useEffect, useState } from 'react';

import { closeEditor, updateCellValue, updateEditorValue } from '../../actionCreators';
import { ActionType } from '../../enums';
import { DispatchFunc } from '../../types';
import { getValueByColumn, replaceValue } from '../../Utils/DataUtils';
import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import { getValidationValue } from '../../Utils/Validation';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const CellEditorState: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column,
    rowData,
    rowKeyValue,
    dispatch,
    value,
  } = props;

  const validationValue = getValidationValue(value, rowData, column);
  const onValueStateChange = (action: any): void => {
    dispatch(updateEditorValue(rowKeyValue, column.key, action.value));
  };

  const close = useCallback(() => {
    dispatch(closeEditor(rowKeyValue, column.key));
  }, [dispatch, column, rowKeyValue]);

  const closeHandler = useCallback(() => {
    if (!validationValue) {
      if (getValueByColumn(rowData, column) !== value) {
        dispatch(updateCellValue(rowKeyValue, column.key, value));
      }
      close();
    }
  }, [validationValue, dispatch, close, column, rowData, rowKeyValue, value]);

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

  const stateProps = { ...props, ...{
    dispatch: dispatchHandler,
  }};

  return (
    <>
      <div className={`ka-cell-editor ${validationValue ? 'ka-cell-editor-validation-error' : ''}`}>
        <CellEditorDataType {...stateProps} />
        {validationValue && <CellEditorValidationMessage message={validationValue} />}
      </div>
    </>
  );
};

export default CellEditorState;
