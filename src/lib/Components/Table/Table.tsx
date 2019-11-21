import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, SortingMode } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { FilterCondition } from '../../Models/FilterCondition';
import { Group } from '../../Models/Group';
import { DataChangedFunc, EventFunc, OptionChangedFunc } from '../../types';
import { getOnEventHandler } from '../../Utils/EventUtils';
import { filterData, searchData } from '../../Utils/FilterUtils';
import { sortData } from '../../Utils/SortUtils';
import { convertToColumnTypes } from '../../Utils/TypeUtils';
import HeadRow from '../HeadRow/HeadRow';
import TableBody from '../TableBody/TableBody';

/**
 * Sets the options of the table which are related to its looks
 */
export interface ITableOption {
  /** Columns in table and their look and behaviour */
  columns: Column[];
  /** Specifies the array of cells which are being edited */
  editableCells?: Cell[];
  /** Sets the editing mode */
  editingMode?: EditingMode;
  /** Sets filters for columns */
  filterRow?: FilterCondition[];
  /** Sets the groups option */
  groups?: Group[];
  /** Sets the expanded groups */
  groupsExpanded?: any[][];
  /** Specifies the column unique field which will be used as a key */
  rowKey: string;
  /** Specifies the array of keys of rows which were selected */
  selectedRows?: any[];
  /** Sets the sorting mode */
  sortingMode?: SortingMode;
  /**
   * Sets the search by data columns
   * (TODO: replace string to any)
   */
  search?: string;
}

export interface ITableEvents {
  /** Called each time Data is changed */
  onDataChanged?: DataChangedFunc;
  /** Called each time ITableOption changed */
  onOptionChanged: OptionChangedFunc;
  /** Called each time when some event emited */
  onEvent?: EventFunc;
}

export interface ITableAllProps extends ITableEvents, ITableOption {
  /** The data which is shown in Table's rows */
  data: any[];
}

export const Table: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    groups,
    filterRow,
    search,
    sortingMode = SortingMode.None,
  } = props;
  let { columns, data } = props;
  const realColumns = columns.filter((c) => c.field);
  data = search ? searchData(realColumns, data, search) : data;
  data = convertToColumnTypes(data, realColumns);
  data = filterRow ? filterData(data, filterRow) : data;
  data = sortData(realColumns, data);

  let groupColumnsCount = 0;
  if (groups) {
    groupColumnsCount = groups.length;
    columns = columns.filter((c) => !groups.some((g) => g.field === c.field));
  }

  const tableOnEvent = getOnEventHandler(props);

  return (
    <div className='tc'>
      <table className={defaultOptions.css.table}>
        <thead className={defaultOptions.css.thead}>
          <HeadRow
            groupColumnsCount={groupColumnsCount}
            columns={columns}
            onEvent={tableOnEvent}
            sortingMode={sortingMode}
          />
        </thead>
        <TableBody
            {...props}
            data={data}
            columns={columns}
            onEvent={tableOnEvent}
            groupColumnsCount={groupColumnsCount}
        />
      </table>
    </div>
  );
};
