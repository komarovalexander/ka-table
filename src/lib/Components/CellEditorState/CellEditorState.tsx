import React, { useCallback, useEffect } from 'react';

import { closeEditor, updateCellValue, updateEditorValue } from '../../actionCreators';
import { ActionType } from '../../enums';
import { DispatchFunc } from '../../types';
import { getValueByColumn } from '../../Utils/DataUtils';
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
  } = props;

  const validationMessage = getValidationValue(value, rowData, column);
  const onValueStateChange = (action: any): void => {
    dispatch(updateEditorValue(rowKeyValue, column.key, action.value, { validate: true }));
  };

  const close = useCallback(() => {
    dispatch(closeEditor(rowKeyValue, column.key));
  }, [dispatch, column, rowKeyValue]);

  const closeHandler = useCallback(() => {
    if (!validationMessage) {
      if (getValueByColumn(rowData, column) !== value) {
        dispatch(updateCellValue(rowKeyValue, column.key, value));
      }
      close();
    }
  }, [validationMessage, dispatch, close, column, rowData, rowKeyValue, value]);

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
    validationMessage: validationMessage || undefined
  }};

  return (
    <CellEditorValidation {...stateProps} />
  );
};

export default CellEditorState;
