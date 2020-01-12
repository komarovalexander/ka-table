import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType, EditingMode } from '../../enums';
import { ChildAttributes } from '../../models';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { DataChangeFunc, DataRowFunc, DispatchFunc, OptionChangeFunc } from '../../types';
import { getExpandedGroups, getGroupedData } from '../../Utils/GroupUtils';
import VirtualizedRows from '../VirtualizedRows/VirtualizedRows';

export interface ITableBodyProps {
  childAttributes: ChildAttributes;
  columns: Column[];
  data: any[];
  dataRow?: DataRowFunc;
  dispatch: DispatchFunc;
  editableCells: Cell[];
  editingMode: EditingMode;
  groupColumnsCount: number;
  groupedColumns: Column[];
  groups?: Group[];
  groupsExpanded?: any[][];
  onDataChange?: DataChangeFunc;
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
      dispatch(ActionType.ScrollTable, { scrollTop: event.currentTarget.scrollTop, timeStamp: event.timeStamp  });
    }}>
      <VirtualizedRows
        {...props}
        data={groupedData}
      />
    </tbody>
  );
};

export default TableBody;
