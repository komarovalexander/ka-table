import React, { useCallback, useEffect, useState } from 'react';

import { changeCellValue, closeEditor } from '../../actionCreators';
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
  } = props;
  const [rowDataState, changeValue] = useState(rowData);

  const validationValue = getValidationValue(rowDataState, column);
  const onValueStateChange = (action: any): void => {
    const newRowValue = replaceValue(rowData, column, action.value);
    changeValue(newRowValue);
  };

  const close = useCallback(() => {
    dispatch(closeEditor(rowKeyValue, column.key));
  }, [dispatch, column, rowKeyValue]);

  const closeHandler = useCallback(() => {
    if (!validationValue) {
      const newValue = getValueByColumn(rowDataState, column);
      if (getValueByColumn(rowData, column) !== newValue) {
        dispatch(changeCellValue(rowKeyValue, column.key, newValue));
      }
      close();
    }
  }, [validationValue, dispatch, close, rowDataState, column, rowData, rowKeyValue]);

  useEffect(() => {
    return addEscEnterKeyEffect(close, closeHandler);
  }, [close, closeHandler]);

  const dispatchHandler: DispatchFunc = (action: any) => {
    if (action.type === ActionType.CloseEditor) {
      closeHandler();
    } else if (action.type === ActionType.ChangeCellValue) {
      onValueStateChange(action);
    } else {
      dispatch(action);
    }
  };

  const stateProps = { ...props, ...{
    dispatch: dispatchHandler,
    rowData : rowDataState,
    value: getValueByColumn(rowDataState, column),
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
