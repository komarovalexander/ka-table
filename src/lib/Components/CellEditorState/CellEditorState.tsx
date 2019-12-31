import React, { useCallback, useEffect, useState } from 'react';

import { ActionType } from '../../enums';
import { Cell } from '../../models';
import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import { getValidationValue } from '../../Utils/Validation';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const CellEditorState: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column,
    field,
    column: {
      key,
    },
    rowData,
    rowKeyField,
    dispatch,
  } = props;
  const [value, changeValue] = useState(rowData);

  const validationValue = getValidationValue(value, field, column.validation);
  const onValueStateChange = (rowValue: any): void => {
    changeValue(rowValue);
  };

  const close = useCallback(() => {
    const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
    dispatch(ActionType.CloseEditor, { cell });
  }, [dispatch, column, rowData, rowKeyField]);

  const closeHandler = useCallback(() => {
    if (!validationValue) {
      if (rowData[key] !== value[key]) {
        dispatch(ActionType.ChangeRowData, { newValue: { ...rowData, ...{ [key]: value[key] } } });
      }
      close();
    }
  }, [validationValue, dispatch, close, value, key, rowData]);

  useEffect(() => {
    return addEscEnterKeyEffect(close, closeHandler);
  }, [close, closeHandler]);

  const dispatchHandler = (action: string, actionData: any) => {
    if (action === ActionType.CloseEditor) {
      closeHandler();
    } else if (action === ActionType.ChangeRowData) {
      onValueStateChange(actionData.newValue);
    } else {
      dispatch(action, actionData);
    }
  };

  const stateProps = { ...props, ...{
    dispatch: dispatchHandler,
    rowData : value,
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
