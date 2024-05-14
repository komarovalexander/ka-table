import { closeEditor, updateCellValue } from '../../actionCreators';

import { ICellEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = (props) => {
    const {
        column,
        dispatch,
        value,
        rowKeyValue,
        autoFocus,
        childComponents
    } = props;
    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: `${defaultOptions.css.textInput}`,
        autoFocus,
        type: 'text',
        value: value || '',
        onChange: (event) => {
            dispatch(updateCellValue(
                rowKeyValue,
                column.key,
                event.currentTarget.value,
                value
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

export default CellEditorString;
