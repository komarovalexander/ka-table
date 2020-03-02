import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, FilteringMode, SortingMode } from '../../enums';
import { Cell } from '../../Models/Cell';
import { ChildAttributes } from '../../Models/ChildAttributes';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import {
  DataChangeFunc, DataRowFunc, DispatchFunc, EventFunc, GroupRowFunc, NoDataRowFunc,
  OptionChangeFunc,
} from '../../types';
import { wrapDispatch } from '../../Utils/ActionUtils';
import { filterData, searchData } from '../../Utils/FilterUtils';
import { getExpandedGroups, getGroupedData } from '../../Utils/GroupUtils';
import { extendProps } from '../../Utils/PropsUtils';
import { sortData } from '../../Utils/SortUtils';
import { convertToColumnTypes } from '../../Utils/TypeUtils';
import FilterRow from '../FilterRow/FilterRow';
import HeadRow from '../HeadRow/HeadRow';
import TableBody from '../TableBody/TableBody';

/**
 * Sets the options of the table which are related to its looks
 */
export interface ITableOption {
  columns: Column[];
  dataRow?: DataRowFunc;
  editableCells?: Cell[];
  editingMode?: EditingMode;
  filteringMode?: FilteringMode;
  groupRow?: GroupRowFunc;
  groups?: Group[];
  groupsExpanded?: any[][];
  noDataRow?: NoDataRowFunc;
  rowKeyField: string;
  search?: string;
  selectedRows?: any[];
  sortingMode?: SortingMode;
  virtualScrolling?: VirtualScrolling;
  data?: any[];
}

export interface ITableEvents {
  onDataChange?: DataChangeFunc;
  onDispath?: DispatchFunc;
  onEvent?: EventFunc;
  onOptionChange?: OptionChangeFunc;
}

export interface ITableAllProps extends ITableEvents, ITableOption {
  childAttributes?: ChildAttributes;
  data?: any[];
}

export const Table: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    childAttributes = {},
    editableCells = [],
    editingMode = EditingMode.None,
    filteringMode,
    groups,
    search,
    selectedRows = [],
    sortingMode = SortingMode.None,
  } = props;
  let {
    columns,
    data = [],
  } = props;
  data = search ? searchData(columns, data, search) : data;

  data = convertToColumnTypes(data, columns);

  data = filterData(data, columns);
  data = sortData(columns, data);

  let groupColumnsCount = 0;
  let groupedColumns: Column[] = [];
  if (groups) {
    groupColumnsCount = groups.length;
    groupedColumns = columns.filter((c) => groups.some((g) => g.columnKey === c.key));
    columns = columns.filter((c) => !groups.some((g) => g.columnKey === c.key));
  }

  let { groupsExpanded } = props;
  const groupedData = groups ? getGroupedData(data, groups, groupedColumns, groupsExpanded) : data;
  if (groups && !groupsExpanded) {
    groupsExpanded = getExpandedGroups(groupedData);
  }

  const theadRef = React.useRef<HTMLTableSectionElement>(null);
  const dispatch = wrapDispatch({ ...props, groupsExpanded }, theadRef);

  const componentProps: React.HTMLAttributes<HTMLTableElement> = {
    className: defaultOptions.css.table,
  };

  const tableProps = extendProps(componentProps, props, childAttributes.table, dispatch);
  const areAllRowsSelected = data.length === selectedRows.length;

  return (
    <div className='ka' >
      <table {...tableProps}>
        <thead className={defaultOptions.css.thead} ref={theadRef}>
          <HeadRow
            areAllRowsSelected={areAllRowsSelected}
            groupColumnsCount={groupColumnsCount}
            columns={columns}
            dispatch={dispatch}
            sortingMode={sortingMode}
          />
          {filteringMode === FilteringMode.FilterRow &&
            (
              <FilterRow
                columns={columns}
                dispatch={dispatch}
                groupColumnsCount={groupColumnsCount}
              />
            )}
        </thead>
        <TableBody
            {...props}
            childAttributes={childAttributes}
            columns={columns}
            data={groupedData}
            dispatch={dispatch}
            editableCells={editableCells}
            editingMode={editingMode}
            groupColumnsCount={groupColumnsCount}
            groupedColumns={groupedColumns}
            groupsExpanded={groupsExpanded}
            selectedRows={selectedRows}
        />
      </table>
    </div >
  );
};
