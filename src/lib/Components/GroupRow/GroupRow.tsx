import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Column, Group } from '../../models';
import { GroupRowData } from '../../Models/GroupRowData';
import { OptionChangeFunc } from '../../types';
import { groupClick } from '../../Utils/GroupUtils';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IGroupRowProps {
  columns: Column[];
  emptyColumnsCount: number;
  groupRowData: GroupRowData;
  groups: Group[];
  groupsExpanded: any[][];
  onOptionChange: OptionChangeFunc;
}

const GroupRow: React.FunctionComponent<IGroupRowProps> = ({
  columns,
  emptyColumnsCount,
  groupRowData,
  groups,
  groupsExpanded,
  onOptionChange,
}) => {
  return (
    <tr className={defaultOptions.css.groupRow}>
      <EmptyCells count={emptyColumnsCount}/>
      <td
        className='ka-group-column'
        colSpan={columns.length - emptyColumnsCount + groups.length}>
          <div className='ka-group-column-content'>
            <div
              onClick={() => {
                groupClick(groupsExpanded, groupRowData, onOptionChange);
              }}
              className={groupsExpanded.some((ge) => JSON.stringify(ge) === JSON.stringify(groupRowData.key))
                ? defaultOptions.css.iconGroupArrowExpanded : defaultOptions.css.iconGroupArrowCollapsed}
            />
            <div className='ka-group-text'>{groupRowData.value.toString()}</div>
          </div>
      </td>
    </tr>
  );
};

export default GroupRow;
