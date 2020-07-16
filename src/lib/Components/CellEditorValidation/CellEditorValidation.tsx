import React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const CellEditorValidation: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    validationMessage,
  } = props;
  return (
    <>
      <CellEditorDataType {...props} />
      {validationMessage && <CellEditorValidationMessage message={validationMessage} />}
    </>
  );
};

export default CellEditorValidation;
