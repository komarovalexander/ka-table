import React from 'react';

import { updateGroupsExpanded } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IGroupRowProps {
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
    column,
    contentColSpan,
    dispatch,
    groupIndex,
    groupKey,
    isExpanded,
    text,
  } = props;
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
              column && column.groupCell ? column.groupCell(props) : <div className='ka-group-text'>{text}</div>
            }
          </div>
      </td>
    </>
  );
};

export default GroupRowContent;
