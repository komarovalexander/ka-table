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
      <div className={`ka-cell-editor ${validationMessage ? 'ka-cell-editor-validation-error' : ''}`}>
        <CellEditorDataType {...props} />
        {validationMessage && <CellEditorValidationMessage message={validationMessage} />}
      </div>
    </>
  );
};

export default CellEditorValidation;
