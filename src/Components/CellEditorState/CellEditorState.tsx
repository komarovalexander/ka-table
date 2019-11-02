import React, { useCallback, useEffect, useState } from 'react';

import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import { getValidationValue } from '../../Utils/Validation';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const CellEditorState: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column,
    column: {
      field,
    },
    rowData,
    close,
    onValueChange,
  } = props;
  const [value, changeValue] = useState(rowData);

  const validationValue = getValidationValue(value, column.field, column.validation);
  const onValueStateChange = (newValue: any): void => {
    const rowValue = { ...rowData, ...{ [field]: newValue } };
    changeValue(rowValue);
  };

  const closeHandler = useCallback(() => {
    if (!validationValue) {
      onValueChange({ ...rowData, ...{ [field]: value[field] } });
      close();
    }
  }, [validationValue, onValueChange, close, value, field, rowData]);

  useEffect(() => {
    return addEscEnterKeyEffect(close, closeHandler);
  }, [close, closeHandler]);

  const stateProps = { ...props, ...{
    close: closeHandler,
    onValueChange: onValueStateChange,
    rowData : value,
  }};

  return (
    <>
      <CellEditorDataType {...stateProps} />
      {validationValue && <CellEditorValidationMessage message={validationValue} />}
    </>
  );
};

export default CellEditorState;
