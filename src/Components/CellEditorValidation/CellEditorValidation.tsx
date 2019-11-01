import React, { useCallback, useState } from 'react';

import { Column } from '../../Models/Column';
import CellEditor, { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const getValidationValue = (rowData: any, column: Column) => {
  const { field, validation } = column;
  if (validation) {
    return validation(rowData[field], rowData);
  }
};
const CellEditorValidation: React.FunctionComponent<ICellEditorProps> = (props) => {
  const { close, column, rowData, onValueChange } = props;
  const initValue = getValidationValue(rowData, column);
  const [value, changeValue] = useState(initValue);

  const onValueValidationChange = useCallback((newValue: any): void => {
    const validationValue = getValidationValue(newValue, column);
    changeValue(validationValue);
    if (!validationValue) {
      onValueChange(newValue);
      close();
    }
  }, [changeValue, column, onValueChange]);

  const closeWithValidation = useCallback(() => {
    if (!value) {
     // close();
    }
  }, [value, close]);
  const newProps = {
    ...props,
    close: closeWithValidation,
    onValueChange: onValueValidationChange,
  };
  return (
    <>
      <CellEditor {...newProps}/>
      {value && <CellEditorValidationMessage message={value} />}
    </>
  );
};

export default CellEditorValidation;
