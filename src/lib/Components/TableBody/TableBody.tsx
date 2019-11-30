import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, Events } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterCondition } from '../../Models/FilterCondition';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { DataChangedFunc, EventFunc, OptionChangedFunc } from '../../types';
import { getExpandedGroups, getGroupedData } from '../../Utils/GroupUtils';
import FilterRow from '../FilterRow/FilterRow';
import VirtualizedRows from '../VirtualizedRows/VirtualizedRows';

export interface ITableBodyProps {
  columns: Column[];
  data: any[];
  editableCells: Cell[];
  editingMode: EditingMode;
  filterRow?: FilterCondition[];
  groupedColumns: Column[];
  groupColumnsCount: number;
  groups?: Group[];
  groupsExpanded?: any[][];
  onDataChanged?: DataChangedFunc;
  onEvent: EventFunc;
  onOptionChanged: OptionChangedFunc;
  rowKeyField: string;
  selectedRows: any[];
  virtualScrolling?: VirtualScrolling;
}

const TableBody: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    columns,
    data,
    filterRow,
    groupedColumns,
    groups,
    onEvent,
    onOptionChanged,
  } = props;
  const { groupsExpanded } = props;
  const groupedData = groups ? getGroupedData(data, groups, groupedColumns, groupsExpanded) : data;
  if (groups && !groupsExpanded) {
    onOptionChanged({ groupsExpanded: getExpandedGroups(groupedData) });
    return <></>;
  }
  return (
    <tbody className={defaultOptions.css.tbody} onScroll={(event) => {
      onEvent(Events.ScrollTable, { scrollTop: event.currentTarget.scrollTop, timeStamp: event.timeStamp  });
    }}>
      <VirtualizedRows
        {...props}
        data={groupedData}
      />
    </tbody>
  );
};

export default TableBody;
