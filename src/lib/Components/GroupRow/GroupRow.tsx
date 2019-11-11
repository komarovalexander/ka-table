import React from 'react';

import { Column } from '../../Models/Column';
import { GroupRowData } from '../../Models/GroupRowData';
import { OptionChangedFunc } from '../../types';
import { groupClick } from '../../Utils/GroupUtils';

export interface IGroupRowProps {
  columns: Column[];
  groupRowData: GroupRowData;
  groupsExpanded: any[][];
  onOptionChanged: OptionChangedFunc;
}

const GroupRow: React.FunctionComponent<IGroupRowProps> = ({
  columns,
  groupRowData,
  groupsExpanded,
  onOptionChanged,
}) => {
  return (
    <tr>
      <td
        colSpan={columns.length}
        onClick={() => {
          groupClick(groupsExpanded, groupRowData, onOptionChanged);
        }}>{groupRowData.value.toString()}
      </td>
    </tr>
  );
};

export default GroupRow;
