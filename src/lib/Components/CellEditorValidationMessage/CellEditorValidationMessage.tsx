import React from 'react';

import { ICellEditorValidationMessageProps } from '../../props';

const CellEditorValidationMessage: React.FunctionComponent<ICellEditorValidationMessageProps> = (props) => {
    const { id, message } = props;

    return (
        <div className='ka-validation-message-container'>
            <div id={id} role='alert' className='ka-validation-message'>{message}</div>
        </div>
    );
};

export default CellEditorValidationMessage;
