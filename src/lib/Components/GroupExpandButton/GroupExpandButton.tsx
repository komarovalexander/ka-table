import { buttonAttributes, getAriaLabel } from '../../Utils/AriaUtils';

import { CollapsedIcon } from '../../Icons/CollapsedIcon';
import { ExpandedIcon } from '../../Icons/ExpandedIcon';
import { IGroupRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateGroupsExpanded } from '../../actionCreators';

const GroupExpandButton: React.FunctionComponent<IGroupRowProps> = (props) => {
    const {
        childComponents,
        column,
        dispatch,
        groupKey,
        isExpanded,
        text,
    } = props;

    const { elementAttributes, content } = getElementCustomization({
        className: 'ka-icon-group-arrow',
        ...buttonAttributes,
        'aria-expanded': isExpanded,
        // the button is named by the group, aria-expanded tells its state
        'aria-label': getAriaLabel(text) || column?.title,
        onClick: () => {
            dispatch(updateGroupsExpanded(groupKey));
        }
    }, props, childComponents.groupExpandButton);

    return (
        content || <div {...elementAttributes}>{(
            isExpanded
                ? <ExpandedIcon className={defaultOptions.css.iconGroupArrowExpanded } />
                : <CollapsedIcon className={defaultOptions.css.iconGroupArrowCollapsed} />
        )}

        </div>
    );
};

export default GroupExpandButton;
