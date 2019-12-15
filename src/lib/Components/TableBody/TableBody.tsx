import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, Events } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { DataChangeFunc, EventFunc, OptionChangeFunc } from '../../types';
import { getExpandedGroups, getGroupedData } from '../../Utils/GroupUtils';
import VirtualizedRows from '../VirtualizedRows/VirtualizedRows';

export interface ITableBodyProps {
  columns: Column[];
  data: any[];
  editableCells: Cell[];
  editingMode: EditingMode;
  groupedColumns: Column[];
  groupColumnsCount: number;
  groups?: Group[];
  groupsExpanded?: any[][];
  onDataChange?: DataChangeFunc;
  dispatch: EventFunc;
  onOptionChange: OptionChangeFunc;
  rowKeyField: string;
  selectedRows: any[];
  virtualScrolling?: VirtualScrolling;
}

const TableBody: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    data,
    groupedColumns,
    groups,
    dispatch,
    onOptionChange,
  } = props;
  const { groupsExpanded } = props;
  const groupedData = groups ? getGroupedData(data, groups, groupedColumns, groupsExpanded) : data;
  if (groups && !groupsExpanded) {
    onOptionChange({ groupsExpanded: getExpandedGroups(groupedData) });
    return <></>;
  }
  return (
    <tbody className={defaultOptions.css.tbody} onScroll={(event) => {
      dispatch(Events.ScrollTable, { scrollTop: event.currentTarget.scrollTop, timeStamp: event.timeStamp  });
    }}>
      <VirtualizedRows
        {...props}
        data={groupedData}
      />
    </tbody>
  );
};

export default TableBody;
