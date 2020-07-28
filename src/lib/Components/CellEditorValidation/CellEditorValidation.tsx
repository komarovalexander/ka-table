import React from 'react';

import { kaDefaultOptions } from '../../';
import { ICellEditorProps } from '../../props';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const CellEditorValidation: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    validationMessage,
  } = props;
  return (
    <div className={`${validationMessage ? kaDefaultOptions.css.kaCellEditorValidationError : ''}`}>
      <CellEditorDataType {...props} />
      {validationMessage && <CellEditorValidationMessage message={validationMessage} />}
    </div>
  );
};

export default CellEditorValidation;
