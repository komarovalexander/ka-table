import * as React from 'react';

import groupMark from '../../Constants/GroupMark';
import { EditingMode } from '../../Enums/EditingMode';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterRowItem } from '../../Models/FilterRowItem';
import { DataChangedFunc } from '../../Types/DataChangedFunc';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../../Utils/ArrayUtils';
import { getExpandedGroups, getGroupedData } from '../../Utils/GroupUtils';
import FilterRow from '../FilterRow/FilterRow';
import GroupRow from '../GroupRow/GroupRow';
import Row from '../Row/Row';

export interface ITableBodyProps {
  columns: Column[];
  data: any[];
  editableCells?: Cell[];
  editingMode?: EditingMode;
  filterRow?: FilterRowItem[];
  groups?: string[];
  groupsExpanded?: any[][];
  onDataChanged?: DataChangedFunc;
  onOptionChanged: OptionChangedFunc;
  rowKey: string;
}

const TableBody: React.FunctionComponent<ITableBodyProps> = ({
  columns,
  data,
  editableCells = [],
  editingMode = EditingMode.None,
  filterRow,
  groups,
  groupsExpanded,
  onDataChanged = () => {},
  onOptionChanged,
  rowKey,
}) => {
  const groupedData = groups ? getGroupedData(data, groups, groupsExpanded) : data;

  if (groups && !groupsExpanded) {
    groupsExpanded = getExpandedGroups(groupedData);
  }
  return (
    <tbody>
      {filterRow && <FilterRow columns={columns} filterRow={filterRow} onOptionChanged={onOptionChanged}/>}
      {groupedData.map((d) => {
        return (
          d.groupMark === groupMark
          ? (
            <GroupRow
              key={d.key}
              columns={columns}
              groupRowData={d}
              groupsExpanded={groupsExpanded || []}
              onOptionChanged={onOptionChanged} />
          ) : (
            <Row
              key={d[rowKey]}
              columns={columns}
              rowData={d}
              rowKey={rowKey}
              onOptionChanged={onOptionChanged}
              editableCells={editableCells}
              editingMode={editingMode}
              onRowDataChanged={(rowData: any) => {
                const newData = getCopyOfArrayAndInsertOrReplaceItem(rowData, rowKey, data);
                onDataChanged(newData);
              }}
            />
          )
        );
      })}
    </tbody>
  );
};

export default TableBody;
