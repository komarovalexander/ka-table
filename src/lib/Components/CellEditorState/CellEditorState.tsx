import React, { useCallback, useEffect, useState } from 'react';

import { Action } from '../../enums';
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
    dispatch(Action.CloseEditor, { cell });
  }, [dispatch, column, rowData, rowKeyField]);

  const closeHandler = useCallback(() => {
    if (!validationValue) {
      if (rowData[key] !== value[key]) {
        dispatch(Action.ChangeRowData, { newValue: { ...rowData, ...{ [key]: value[key] } } });
      }
      close();
    }
  }, [validationValue, dispatch, close, value, key, rowData]);

  useEffect(() => {
    return addEscEnterKeyEffect(close, closeHandler);
  }, [close, closeHandler]);

  const dispatchHandler = (event: string, eventData: any) => {
    if (event === Action.CloseEditor) {
      closeHandler();
    } else if (event === Action.ChangeRowData) {
      onValueStateChange(eventData.newValue);
    } else {
      dispatch(event, eventData);
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
