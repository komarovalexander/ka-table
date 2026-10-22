import * as React from 'react';

import { GroupPanelCell } from '../GroupPanelCell/GroupPanelCell';
import { IGroupPanelProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { groupPanelOnDrop, isDraggedItemOfKind } from '../../Utils/PropsUtils';
import { isMaxDeep } from '../../Utils/GroupUtils';

export const GroupPanel: React.FunctionComponent<IGroupPanelProps> = (props) => {
    const {
        columns,
        groups,
        groupPanel,
        dispatch,
        childComponents = {},
    } = props;
    const canDrop = !isMaxDeep(groupPanel, columns, groups);
    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.groupPanel,
        onDrop: canDrop ? (e) => groupPanelOnDrop(e, dispatch) : undefined,
        onDragOver: canDrop ? (event) => {
            // only the columns of this table are dropped here
            if (isDraggedItemOfKind(event, 'column')) {
                event.preventDefault();
            }
        } : undefined
    }, props, childComponents.groupPanel);
    return (
        <div {...elementAttributes}>
            {content || groups?.map(group => {
                const column = columns.find(c => c.key === group.columnKey);
                return column && <GroupPanelCell key={column.key} {...props} column={column} />;
            }) || <div className={defaultOptions.css.groupPanelText}>{groupPanel.text}</div>}
        </div>
    );
};
