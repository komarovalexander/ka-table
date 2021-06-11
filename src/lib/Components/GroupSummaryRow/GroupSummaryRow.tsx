import * as React from 'react';
import defaultOptions from '../../defaultOptions';
import { IGroupSummaryRowProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import EmptyCells from '../EmptyCells/EmptyCells';
import { GroupSummaryCell } from '../GroupSummaryCell/GroupSummaryCell';

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
                    <EmptyCells count={groupColumnsCount}/>
                    {columns.map((column) => <GroupSummaryCell key={column.key} {...props} column={column} />)}
                </>
            )}
        </tr>
    );
};
