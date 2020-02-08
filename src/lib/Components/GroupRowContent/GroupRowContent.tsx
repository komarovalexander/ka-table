import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { DispatchFunc } from '../../types';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IGroupRowProps {
  contentColSpan: number;
  dispatch: DispatchFunc;
  emptyColumnsCount: number;
  groupKey: any[];
  isExpanded: boolean;
  text: string;
}

const GroupRowContent: React.FunctionComponent<IGroupRowProps> = ({
  contentColSpan,
  dispatch,
  emptyColumnsCount,
  groupKey,
  isExpanded,
  text,
}) => {
  return (
    <>
      <EmptyCells count={emptyColumnsCount}/>
      <td
        className='ka-group-column'
        colSpan={contentColSpan}>
          <div className='ka-group-column-content'>
            <div
              onClick={() => {
                dispatch(ActionType.UpdateGroupsExpanded, {
                  groupKey,
                });
              }}
              className={isExpanded
                ? defaultOptions.css.iconGroupArrowExpanded : defaultOptions.css.iconGroupArrowCollapsed}
            />
            <div className='ka-group-text'>{text}</div>
          </div>
      </td>
    </>
  );
};

export default GroupRowContent;
