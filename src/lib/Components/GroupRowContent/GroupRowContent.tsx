import EmptyCells from '../EmptyCells/EmptyCells';
import { IGroupRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateGroupsExpanded } from '../../actionCreators';

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
    className: defaultOptions.css.groupCell,
    colSpan: contentColSpan
  }, props, childComponents.groupCell);

  return (
    <>
      <EmptyCells count={groupIndex} childComponents={childComponents}/>
      <td {...elementAttributes}>
          <div className='ka-group-cell-content'>
            <div
              onClick={() => {
                dispatch(updateGroupsExpanded(groupKey));
              }}
              className={isExpanded
                ? defaultOptions.css.iconGroupArrowExpanded : defaultOptions.css.iconGroupArrowCollapsed}
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
