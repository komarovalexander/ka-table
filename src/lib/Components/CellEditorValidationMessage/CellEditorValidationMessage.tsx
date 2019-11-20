import React from 'react';

export interface ICellEditorValidationMessageProps {
  message: string;
}

const CellEditorValidationMessage: React.FunctionComponent<ICellEditorValidationMessageProps> = (props) => {
  const { message } = props;

  return (
    <div className='tc-validation-message'>{message}</div>
  );
};

export default CellEditorValidationMessage;
