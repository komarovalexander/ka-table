import React from 'react';

import defaultOptions from '../../defaultOptions';
import { GroupRowData } from '../../Models/GroupRowData';
import { OptionChangedFunc } from '../../types';
import { groupClick } from '../../Utils/GroupUtils';

export interface IGroupRowProps {
  groupColumnsCount: number;
  groupRowData: GroupRowData;
  groupsExpanded: any[][];
  onOptionChanged: OptionChangedFunc;
}

const getEmptyColumns = (count: number) => {
  const columns = [];
  for (let i = 0; i < count; i++) {
    columns.push(<td colSpan={0} className='tc-empty-column'/>);
  }
  return columns;
};

const GroupRow: React.FunctionComponent<IGroupRowProps> = ({
  groupColumnsCount,
  groupRowData,
  groupsExpanded,
  onOptionChanged,
}) => {
  return (
    <tr className='tc-group-row'>
      {getEmptyColumns(groupColumnsCount)}
      <td
        className='tc-group-column'
        colSpan={'100%' as any}
        onClick={() => {
          groupClick(groupsExpanded, groupRowData, onOptionChanged);
        }}>
          <div className={groupsExpanded.some((ge) => JSON.stringify(ge) === JSON.stringify(groupRowData.key))
            ? defaultOptions.css.iconGroupArrowExpanded : defaultOptions.css.iconGroupArrowCollapsed}/>
          <div className='tc-group-text'>{groupRowData.value.toString()}</div>
      </td>
    </tr>
  );
};

export default GroupRow;
