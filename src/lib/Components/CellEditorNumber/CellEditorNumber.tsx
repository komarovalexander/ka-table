import { closeEditor, updateCellValue } from '../../actionCreators';

import { ICellEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getInputValue } from '../../Utils/DataUtils';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = (props) => {
    const {
        column,
        dispatch,
        value,
        rowKeyValue,
        autoFocus,
        childComponents,
        validationMessage,
        validationMessageId,
    } = props;
    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: `${defaultOptions.css.numberInput}`,
        'aria-label': column.title,
        'aria-invalid': validationMessage ? true : undefined,
        'aria-describedby': validationMessageId,
        autoFocus,
        type: 'number',
        value: getInputValue(value),
        onChange: (event) => {
            const newValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
            dispatch(updateCellValue(
                rowKeyValue,
                column.key,
                newValue
            ));
        },
        onBlur: () => {
            dispatch(closeEditor(rowKeyValue, column.key));
        }
    }, props, childComponents?.cellEditorInput);
    return (
        content ||
    (
        <input {...elementAttributes} />
    )
    );
};

export default CellEditorNumber;
