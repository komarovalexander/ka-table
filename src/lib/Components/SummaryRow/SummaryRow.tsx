import * as React from 'react';

import EmptyCells from '../EmptyCells/EmptyCells';
import { ISummaryRowProps } from '../../props';
import { SummaryCell } from '../SummaryCell/SummaryCell';
import VirtualColumnSpacer from '../VirtualColumnSpacer/VirtualColumnSpacer';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isVirtualColumnSpacer } from '../../Utils/Virtualize';

export const SummaryRow: React.FunctionComponent<ISummaryRowProps> = (props) => {
    const {
        childComponents,
        columns,
        groupColumnsCount
    } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.summaryRow,
    }, props, childComponents?.summaryRow);
    return (
        <tr {...elementAttributes}>
            {content || (
                <>
                    <EmptyCells count={groupColumnsCount} childComponents={childComponents}/>
                    {columns.map((column) => (isVirtualColumnSpacer(column)
                        ? <VirtualColumnSpacer key={column.key} />
                        : <SummaryCell key={column.key} {...props} column={column}/>))}
                </>
            )}
        </tr>
    );
};
