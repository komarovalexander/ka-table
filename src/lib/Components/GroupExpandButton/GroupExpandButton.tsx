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
    dispatch,
    groupKey,
    isExpanded,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: 'ka-icon-group-arrow',
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
