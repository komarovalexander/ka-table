import { closeEditor, updateCellValue } from '../../actionCreators';

import { ICellEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getDateFromInputValue, getDateInputValue } from '../../Utils/DateUtils';
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
        'aria-label': column.title,
        autoFocus,
        type: 'date',
        value: inputValue || '',
        onChange: (event) => {
            // the edited date keeps the type of the value: a string date of a JSON stays a string
            dispatch(updateCellValue(rowKeyValue, column.key, getDateFromInputValue(event.currentTarget.value, value)));
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
