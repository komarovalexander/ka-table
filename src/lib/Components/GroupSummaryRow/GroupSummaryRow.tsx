import * as React from 'react';

import EmptyCells from '../EmptyCells/EmptyCells';
import { GroupSummaryCell } from '../GroupSummaryCell/GroupSummaryCell';
import { IGroupSummaryRowProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

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
                    {columns.map((column) => <GroupSummaryCell key={column.key} {...props} column={column} />)}
                </>
            )}
        </tr>
    );
};
