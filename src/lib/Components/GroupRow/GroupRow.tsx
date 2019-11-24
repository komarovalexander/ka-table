import React from 'react';

import defaultOptions from '../../defaultOptions';
import { GroupRowData } from '../../Models/GroupRowData';
import { OptionChangedFunc } from '../../types';
import { groupClick } from '../../Utils/GroupUtils';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IGroupRowProps {
  emptyColumnsCount: number;
  groupRowData: GroupRowData;
  groupsExpanded: any[][];
  onOptionChanged: OptionChangedFunc;
}

const GroupRow: React.FunctionComponent<IGroupRowProps> = ({
  emptyColumnsCount,
  groupRowData,
  groupsExpanded,
  onOptionChanged,
}) => {
  return (
    <tr className={defaultOptions.css.groupRow}>
      <EmptyCells count={emptyColumnsCount}/>
      <td
        className='tc-group-column'
        colSpan={'100%' as any}>
          <div className='tc-group-column-content'>
            <div
              onClick={() => {
                groupClick(groupsExpanded, groupRowData, onOptionChanged);
              }}
              className={groupsExpanded.some((ge) => JSON.stringify(ge) === JSON.stringify(groupRowData.key))
                ? defaultOptions.css.iconGroupArrowExpanded : defaultOptions.css.iconGroupArrowCollapsed}
            />
            <div className='tc-group-text'>{groupRowData.value.toString()}</div>
          </div>
      </td>
    </tr>
  );
};

export default GroupRow;
