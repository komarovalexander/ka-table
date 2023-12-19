import * as React from 'react';

import { EditingMode } from '../../enums';
import { ICellTextProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
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

    const formattedValue =
    (format && format({ column, value, rowData  }))
    || value?.toString();

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.cellText,
        onClick: () => {
            if (editingMode === EditingMode.Cell) {
                dispatch(openEditor(rowKeyValue, column.key));
            }
        },
    }, props, childComponents.cellText);

    return (
        <div {...elementAttributes}>{content || formattedValue || <>&nbsp;</>}</div>
    );
};

export default CellText;
