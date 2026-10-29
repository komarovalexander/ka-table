import * as React from 'react';

import EmptyCells from '../EmptyCells/EmptyCells';
import { GroupSummaryCell } from '../GroupSummaryCell/GroupSummaryCell';
import { IGroupSummaryRowProps } from '../../props';
import VirtualColumnSpacer from '../VirtualColumnSpacer/VirtualColumnSpacer';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isVirtualColumnSpacer } from '../../Utils/Virtualize';

export const GroupSummaryRow: React.FunctionComponent<IGroupSummaryRowProps> = (props) => {
    const {
        childComponents,
        columns,
        groupColumnsCount
    } = props;

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.groupSummaryRow,
    }, props, childComponents?.groupSummaryRow);
    return (
        <tr {...elementAttributes}>
            {content || (
                <>
                    <EmptyCells count={groupColumnsCount} childComponents={childComponents}/>
                    {columns.map((column) => (isVirtualColumnSpacer(column)
                        ? <VirtualColumnSpacer key={column.key} />
                        : <GroupSummaryCell key={column.key} {...props} column={column} />))}
                </>
            )}
        </tr>
    );
};
