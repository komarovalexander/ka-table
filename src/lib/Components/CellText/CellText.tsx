import * as React from 'react';

import { EditingMode } from '../../enums';
import { ICellTextProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getFormattedValue } from '../../Utils/DataUtils';
import { openEditor } from '../../actionCreators';

const CellText: React.FunctionComponent<ICellTextProps> = (props) => {
    const {
        childComponents,
        column,
        format,
        dispatch,
        editingMode,
        rowKeyValue,
        rowData,
        value,
    } = props;

    const formattedValue = getFormattedValue(value, column, rowData, format);
    // &nbsp; keeps the height of an empty cell, 0 is shown
    const text = formattedValue || formattedValue === 0 ? formattedValue : <>&nbsp;</>;

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.cellText,
        onClick: () => {
            if (editingMode === EditingMode.Cell) {
                dispatch(openEditor(rowKeyValue, column.key));
            }
        },
    }, props, childComponents.cellText);

    return (
        <div {...elementAttributes}>{content || text}</div>
    );
};

export default CellText;
