import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ISummaryCellProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

export const SummaryCell: React.FunctionComponent<ISummaryCellProps> = (props) => {
    const {
        column: { style },
        childComponents
    } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.summaryCell,
        style
    }, props, childComponents?.summaryCell);
    return (
        <td {...elementAttributes}>
            {content}
        </td>
    );
};
