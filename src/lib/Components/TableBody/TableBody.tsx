import * as React from 'react';

import { EditingMode, Events } from '../../enums';
import groupMark from '../../groupMark';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterCondition } from '../../Models/FilterCondition';
import { Group } from '../../Models/Group';
import { DataChangedFunc, EventFunc, OptionChangedFunc } from '../../types';
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
  groupColumnsCount: number;
  groups?: Group[];
  groupsExpanded?: any[][];
  onDataChanged?: DataChangedFunc;
  onEvent: EventFunc;
  onOptionChanged: OptionChangedFunc;
  rowKey: string;
  selectedRows?: any[];
}

const TableBody: React.FunctionComponent<ITableBodyProps> = ({
  columns,
  data,
  editableCells = [],
  editingMode = EditingMode.None,
  filterRow,
  groupColumnsCount,
  groups,
  groupsExpanded,
  onEvent,
  onOptionChanged,
  rowKey,
  selectedRows = [],
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
              emptyColumnsCount={d.key.length - 1}
              groupsExpanded={groupsExpanded || []}
              onOptionChanged={onOptionChanged} />
          ) : (
            <Row
              key={d[rowKey]}
              columns={columns}
              rowData={d}
              rowKey={rowKey}
              editableCells={editableCells}
              editingMode={editingMode}
              groupColumnsCount={groupColumnsCount}
              onEvent={onEvent}
              selectedRows={selectedRows}
              onRowDataChanged={(rowData: any) => {
                onEvent(Events.RowDataChanged, { rowData });
              }}
            />
          )
        );
      })}
    </tbody>
  );
};

export default TableBody;
