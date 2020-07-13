import React from 'react';

import { updateGroupsExpanded } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IGroupRowProps {
  childComponents: ChildComponents;
  column: Column;
  contentColSpan: number;
  dispatch: DispatchFunc;
  groupIndex: number;
  groupKey: any[];
  isExpanded: boolean;
  text: string;
}

const GroupRowContent: React.FunctionComponent<IGroupRowProps> = (props) => {
  const {
    childComponents: { groupCell },
    contentColSpan,
    dispatch,
    groupIndex,
    groupKey,
    isExpanded,
    text,
  } = props;
  const groupCellContent = groupCell && groupCell.content && groupCell.content(props);
  return (
    <>
      <EmptyCells count={groupIndex}/>
      <td
        className='ka-group-column'
        colSpan={contentColSpan}>
          <div className='ka-group-column-content'>
            <div
              onClick={() => {
                dispatch(updateGroupsExpanded(groupKey));
              }}
              className={isExpanded
                ? defaultOptions.css.iconGroupArrowExpanded : defaultOptions.css.iconGroupArrowCollapsed}
            />
            {
              groupCellContent || <div className='ka-group-text'>{text}</div>
            }
          </div>
      </td>
    </>
  );
};

export default GroupRowContent;
