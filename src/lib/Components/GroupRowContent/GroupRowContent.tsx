import React from 'react';

import { kaDefaultOptions } from '../../';
import { updateGroupsExpanded } from '../../actionCreators';
import { IGroupRowProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import EmptyCells from '../EmptyCells/EmptyCells';

const GroupRowContent: React.FunctionComponent<IGroupRowProps> = (props) => {
  const {
    childComponents,
    contentColSpan,
    dispatch,
    groupIndex,
    groupKey,
    isExpanded,
    text,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: kaDefaultOptions.css.groupCell,
    colSpan: contentColSpan
  }, props, childComponents.groupCell);

  return (
    <>
      <EmptyCells count={groupIndex}/>
      <td {...elementAttributes}>
          <div className='ka-group-cell-content'>
            <div
              onClick={() => {
                dispatch(updateGroupsExpanded(groupKey));
              }}
              className={isExpanded
                ? kaDefaultOptions.css.iconGroupArrowExpanded : kaDefaultOptions.css.iconGroupArrowCollapsed}
            />
            {
              content || <div className='ka-group-text'>{text}</div>
            }
          </div>
      </td>
    </>
  );
};

export default GroupRowContent;
