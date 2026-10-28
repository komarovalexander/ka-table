import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../../props';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';
import CellEditorValidationMessage from '../CellEditorValidationMessage/CellEditorValidationMessage';
import { useAriaId } from '../../Utils/AriaUtils';

const CellEditorValidation: React.FunctionComponent<ICellEditorProps & { elementRef?: React.Ref<HTMLDivElement> }> = (props) => {
    const { elementRef, ...editorProps } = props;
    const {
        validationMessage,
    } = editorProps;
    // the editor is described by its validation message, which is announced when it is shown
    const validationMessageId = useAriaId();
    return (
        <div ref={elementRef} className={`${validationMessage ? defaultOptions.css.kaCellEditorValidationError : ''}`}>
            <CellEditorDataType {...editorProps} validationMessageId={validationMessage ? validationMessageId : undefined} />
            {validationMessage && <CellEditorValidationMessage id={validationMessageId} message={validationMessage} />}
        </div>
    );
};

export default CellEditorValidation;
