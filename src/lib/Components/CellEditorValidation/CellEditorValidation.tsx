import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const CellEditorValidation: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    validationMessage,
  } = props;
  return (
    <div className={`${validationMessage ? defaultOptions.css.kaCellEditorValidationError : ''}`}>
      <CellEditorDataType {...props} />
      {validationMessage && <CellEditorValidationMessage message={validationMessage} />}
    </div>
  );
};

export default CellEditorValidation;
