import React from 'react';

export interface ICellEditorValidationMessageProps {
  message: string;
}

const CellEditorValidationMessage: React.FunctionComponent<ICellEditorValidationMessageProps> = (props) => {
  const { message } = props;

  return (
    <div className='ka-validation-message-container'>
      <div className='ka-validation-message'>{message}</div>
    </div>
  );
};

export default CellEditorValidationMessage;
