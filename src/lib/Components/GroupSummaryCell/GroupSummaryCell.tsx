import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IGroupSummaryCellProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getFixedColumnClassName } from '../../Utils/ColumnUtils';
import { useAriaColIndex } from '../TableWrapper/ColumnIndexesContext';

export const GroupSummaryCell: React.FunctionComponent<IGroupSummaryCellProps> = (props) => {
    const {
        column,
        column: { style },
        childComponents
    } = props;
    const ariaColIndex = useAriaColIndex(column.key);
    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.groupSummaryCell + getFixedColumnClassName(column),
        'aria-colindex': ariaColIndex,
        style
    }, props, childComponents?.groupSummaryCell);
    return (
        <td {...elementAttributes}>
            {content}
        </td>
    );
};
