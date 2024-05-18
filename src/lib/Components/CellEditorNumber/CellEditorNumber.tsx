import { closeEditor, updateCellValue } from '../../actionCreators';

import { ICellEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = (props) => {
    const {
        column,
        dispatch,
        value,
        rowKeyValue,
        autoFocus,
        childComponents
    } = props;
    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: `${defaultOptions.css.numberInput}`,
        autoFocus,
        type: 'number',
        value: value === null || value === undefined ? '' : value,
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
