import { closeEditor, updateCellValue } from '../../actionCreators';

import { ICellEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isEmpty } from '../../Utils/CommonUtils';

const CellEditorBoolean: React.FunctionComponent<ICellEditorProps> = (props) => {
    const {
        column,
        dispatch,
        value,
        rowKeyValue,
        autoFocus,
        childComponents
    } = props;
    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: `${defaultOptions.css.checkbox}`,
        autoFocus,
        type: 'checkbox',
        checked: value || false,
        onChange: (event) => dispatch(updateCellValue(
            rowKeyValue,
            column.key,
            event.currentTarget.checked)),
        onBlur: () => dispatch(closeEditor(rowKeyValue, column.key))
    }, props, childComponents?.cellEditorInput);
    return (
        content ||
    (
        <input
            ref={(elem) => {
                elem && (elem.indeterminate = isEmpty(value));
            }}
            {...elementAttributes}
        />
    )
    );
};

export default CellEditorBoolean;
