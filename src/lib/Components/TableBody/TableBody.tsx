import * as React from 'react';

import { EditingMode } from '../../enums';
import groupMark from '../../groupMark';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterCondition } from '../../Models/FilterCondition';
import { Group } from '../../Models/Group';
import { DataChangedFunc, OptionChangedFunc } from '../../types';
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
  filterRow?: FilterCondition[];
  groups?: Group[];
  groupsExpanded?: any[][];
  groupColumnsCount: number;
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
  groupColumnsCount,
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
              groupRowData={d}
              groupColumnsCount={d.key.length - 1}
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
              groupColumnsCount={groupColumnsCount}
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
