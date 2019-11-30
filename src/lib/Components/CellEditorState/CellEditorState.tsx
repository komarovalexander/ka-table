import React, { useCallback, useEffect, useState } from 'react';

import { Events } from '../../enums';
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
    onEvent,
    onValueChange,
  } = props;
  const [value, changeValue] = useState(rowData);

  const validationValue = getValidationValue(value, field, column.validation);
  const onValueStateChange = (newValue: any): void => {
    const rowValue = { ...rowData, ...{ [key]: newValue } };
    changeValue(rowValue);
  };

  const close = useCallback(() => {
    const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
    onEvent(Events.CloseEditor, { cell });
  }, [onEvent, column, rowData, rowKeyField]);

  const closeHandler = useCallback(() => {
    if (!validationValue) {
      if (rowData[key] !== value[key]) {
        onValueChange({ ...rowData, ...{ [key]: value[key] } });
      }
      close();
    }
  }, [validationValue, onValueChange, close, value, key, rowData]);

  useEffect(() => {
    return addEscEnterKeyEffect(close, closeHandler);
  }, [close, closeHandler]);

  const onEventHandler = (event: string, eventData: any) => {
    if (event === Events.CloseEditor) {
      closeHandler();
    } else {
      onEvent(event, eventData);
    }
  };

  const stateProps = { ...props, ...{
    onEvent: onEventHandler,
    onValueChange: onValueStateChange,
    rowData : value,
  }};

  return (
    <>
      <div className={`tc-cell-editor ${validationValue ? 'tc-cell-editor-validation-error' : ''}`}>
        <CellEditorDataType {...stateProps} />
        {validationValue && <CellEditorValidationMessage message={validationValue} />}
      </div>
    </>
  );
};

export default CellEditorState;
