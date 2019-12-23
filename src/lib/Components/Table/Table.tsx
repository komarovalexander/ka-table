import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, SortingMode } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterCondition } from '../../Models/FilterCondition';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { DataChangeFunc, DataRowFunc, EventFunc, OptionChangeFunc } from '../../types';
import { getOnEventHandler } from '../../Utils/EventUtils';
import { filterData, searchData } from '../../Utils/FilterUtils';
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
  filterRow?: FilterCondition[];
  groups?: Group[];
  groupsExpanded?: any[][];
  rowKeyField: string;
  search?: string;
  selectedRows?: any[];
  sortingMode?: SortingMode;
  virtualScrolling?: VirtualScrolling;
}

export interface ITableEvents {
  /** Called each time Data is changed */
  onDataChange?: DataChangeFunc;
  /** Called each time ITableOption changed */
  onOptionChange: OptionChangeFunc;
  /** Called each time when some event emited */
  onEvent?: EventFunc;
}

export interface ITableAllProps extends ITableEvents, ITableOption {
  /** The data which is shown in Table's rows */
  data: any[];
}

export const Table: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    editableCells = [],
    editingMode = EditingMode.None,
    filterRow,
    groups,
    onOptionChange,
    search,
    selectedRows = [],
    sortingMode = SortingMode.None,
  } = props;
  let { columns, data } = props;
  data = search ? searchData(columns, data, search) : data;
  data = convertToColumnTypes(data, columns);
  data = filterRow ? filterData(data, filterRow) : data;
  data = sortData(columns, data);

  let groupColumnsCount = 0;
  let groupedColumns: Column[] = [];
  if (groups) {
    groupColumnsCount = groups.length;
    groupedColumns = columns.filter((c) => groups.some((g) => g.columnKey === c.key));
    columns = columns.filter((c) => !groups.some((g) => g.columnKey === c.key));
  }

  const tableOnEvent = getOnEventHandler(props);

  return (
    <div className='ka' >
      <table className={defaultOptions.css.table}>
        <thead className={defaultOptions.css.thead}>
          <HeadRow
            groupColumnsCount={groupColumnsCount}
            columns={columns}
            dispatch={tableOnEvent}
            sortingMode={sortingMode}
          />
          {filterRow &&
            (
              <FilterRow
                columns={columns}
                filterRow={filterRow}
                groupColumnsCount={groupColumnsCount}
                onOptionChange={onOptionChange}
              />
            )}
        </thead>
        <TableBody
            {...props}
            columns={columns}
            data={data}
            editableCells={editableCells}
            editingMode={editingMode}
            groupColumnsCount={groupColumnsCount}
            groupedColumns={groupedColumns}
            dispatch={tableOnEvent}
            selectedRows={selectedRows}
        />
      </table>
    </div >
  );
};
