import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ISummaryCellProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getFixedColumnClassName } from '../../Utils/ColumnUtils';
import { useAriaColIndex } from '../TableWrapper/ColumnIndexesContext';

export const SummaryCell: React.FunctionComponent<ISummaryCellProps> = (props) => {
    const {
        column,
        column: { style },
        childComponents
    } = props;
    const ariaColIndex = useAriaColIndex(column.key);
    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.summaryCell + getFixedColumnClassName(column),
        'aria-colindex': ariaColIndex,
        style
    }, props, childComponents?.summaryCell);
    return (
        <td {...elementAttributes}>
            {content}
        </td>
    );
};
