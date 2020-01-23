import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { Column, Group } from '../../models';
import { GroupRowData } from '../../Models/GroupRowData';
import { DispatchFunc } from '../../types';
import { getGroupText, updateExpandedGroups } from '../../Utils/GroupUtils';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IGroupRowProps {
  columns: Column[];
  emptyColumnsCount: number;
  groupRowData: GroupRowData;
  groupedColumns: Column[];
  groups: Group[];
  groupsExpanded: any[][];
  dispatch: DispatchFunc;
}

const GroupRow: React.FunctionComponent<IGroupRowProps> = ({
  columns,
  emptyColumnsCount,
  groupRowData,
  groupedColumns,
  groups,
  groupsExpanded,
  dispatch,
}) => {
  const group = groups && groups[emptyColumnsCount];
  const column = group && groupedColumns.find((c) => c.key === group.columnKey);
  return (
    <tr className={defaultOptions.css.groupRow}>
      <EmptyCells count={emptyColumnsCount}/>
      <td
        className='ka-group-column'
        colSpan={columns.length - emptyColumnsCount + groups.length}>
          <div className='ka-group-column-content'>
            <div
              onClick={() => {
                const updatedGroupsExpanded = updateExpandedGroups(groupsExpanded, groupRowData);
                dispatch(ActionType.UpdateGroupsExpanded, { newValue: { groupsExpanded: updatedGroupsExpanded }});
              }}
              className={groupsExpanded.some((ge) => JSON.stringify(ge) === JSON.stringify(groupRowData.key))
                ? defaultOptions.css.iconGroupArrowExpanded : defaultOptions.css.iconGroupArrowCollapsed}
            />
            <div className='ka-group-text'>{getGroupText(groupRowData.value, column)}</div>
          </div>
      </td>
    </tr>
  );
};

export default GroupRow;
