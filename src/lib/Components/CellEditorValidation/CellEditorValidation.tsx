import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../../props';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';

const CellEditorValidation: React.FunctionComponent<ICellEditorProps & { elementRef?: React.Ref<HTMLDivElement> }> = (props) => {
    const { elementRef, ...editorProps } = props;
    const {
        validationMessage,
    } = editorProps;
    return (
        <div ref={elementRef} className={`${validationMessage ? defaultOptions.css.kaCellEditorValidationError : ''}`}>
            <CellEditorDataType {...editorProps} />
            {validationMessage && <CellEditorValidationMessage message={validationMessage} />}
        </div>
    );
};

export default CellEditorValidation;
