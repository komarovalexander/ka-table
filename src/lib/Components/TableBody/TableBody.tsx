import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, Events } from '../../enums';
import groupMark from '../../groupMark';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterCondition } from '../../Models/FilterCondition';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { DataChangedFunc, EventFunc, OptionChangedFunc } from '../../types';
import { getExpandedGroups, getGroupedData } from '../../Utils/GroupUtils';
import { getVirtualized } from '../../Utils/Virtualize';
import FilterRow from '../FilterRow/FilterRow';
import GroupRow from '../GroupRow/GroupRow';
import Row from '../Row/Row';

export interface ITableBodyProps {
  columns: Column[];
  data: any[];
  editableCells?: Cell[];
  editingMode?: EditingMode;
  filterRow?: FilterCondition[];
  groupedColumns: Column[];
  groupColumnsCount: number;
  groups?: Group[];
  groupsExpanded?: any[][];
  onDataChanged?: DataChangedFunc;
  onEvent: EventFunc;
  onOptionChanged: OptionChangedFunc;
  rowKeyField: string;
  selectedRows?: any[];
  virtualScrolling?: VirtualScrolling;
}

const TableBody: React.FunctionComponent<ITableBodyProps> = ({
  columns,
  data,
  editableCells = [],
  editingMode = EditingMode.None,
  filterRow,
  groupedColumns,
  groupColumnsCount,
  groups,
  groupsExpanded,
  onEvent,
  onOptionChanged,
  rowKeyField,
  selectedRows = [],
  virtualScrolling,
}) => {
  const groupedData = groups ? getGroupedData(data, groups, groupedColumns, groupsExpanded) : data;

  if (groups && !groupsExpanded) {
    groupsExpanded = getExpandedGroups(groupedData);
  }

  let virtualizedData = groupedData;
  let virtualized;
  if (virtualScrolling) {
    virtualized = getVirtualized(virtualScrolling, groupedData);
    virtualizedData = virtualized.virtualizedData;
  }
  const rowDataChangedEvent = onEvent && onEvent.bind(null, Events.RowDataChanged);
  return (
    <tbody className={defaultOptions.css.tbody} onScroll={(event) => {
      onEvent(Events.ScrollTable, { scrollTop: event.currentTarget.scrollTop, timeStamp: event.timeStamp  });
    }}>
      {filterRow && <FilterRow columns={columns} filterRow={filterRow} onOptionChanged={onOptionChanged}/>}
      {virtualized && <tr style={{height: virtualized.beginHeight}} />}
      {virtualizedData.map((d) => {
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
              key={d[rowKeyField]}
              columns={columns}
              rowData={d}
              rowKeyField={rowKeyField}
              editableCells={editableCells}
              editingMode={editingMode}
              groupColumnsCount={groupColumnsCount}
              onEvent={onEvent}
              selectedRows={selectedRows}
              onRowDataChanged={rowDataChangedEvent}
            />
          )
        );
      })}
      {virtualized && <tr style={{height: virtualized.endHeight}} />}
    </tbody>
  );
};

export default TableBody;
