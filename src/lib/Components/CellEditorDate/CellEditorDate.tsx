import { closeEditor, updateCellValue } from '../../actionCreators';

import { ICellEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getDateInputValue } from '../../Utils/DateUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = (props) => {
    const {
        column,
        dispatch,
        value,
        rowKeyValue,
        autoFocus,
        childComponents
    } = props;
    const inputValue = value && getDateInputValue(value);
    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: `${defaultOptions.css.dateInput}`,
        autoFocus,
        type: 'date',
        value: inputValue || '',
        onChange: (event) => {
            const targetValue: string = event.currentTarget.value;
            const newValue = targetValue ? new Date(targetValue) : null;
            dispatch(updateCellValue(
                rowKeyValue,
                column.key,
                newValue && new Date(newValue.getTime() + newValue.getTimezoneOffset() * 60000)));
        },
        onBlur: () => dispatch(closeEditor(rowKeyValue, column.key))
    }, props, childComponents?.cellEditorInput);
    return (
        content ||
    (
        <input {...elementAttributes} />
    )
    );
};

export default CellEditorDate;
