import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, FilteringMode, SortingMode } from '../../enums';
import { Cell } from '../../Models/Cell';
import { ChildAttributes } from '../../Models/ChildAttributes';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import {
  DataChangeFunc, DataRowFunc, EventFunc, NoDataRowFunc, OptionChangeFunc,
} from '../../types';
import { wrapDispatch } from '../../Utils/ActionUtils';
import { filterData, searchData } from '../../Utils/FilterUtils';
import { extendProps } from '../../Utils/PropsUtils';
import { sortData } from '../../Utils/SortUtils';
import { convertToColumnTypes, getColumnsWithWrongType } from '../../Utils/TypeUtils';
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
  groups?: Group[];
  groupsExpanded?: any[][];
  noDataRow?: NoDataRowFunc;
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
  /** Called each time when action was completed */
  onEvent?: EventFunc;
}

export interface ITableAllProps extends ITableEvents, ITableOption {
  /** The data which is shown in Table's rows */
  data: any[];
  childAttributes?: ChildAttributes;
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

  const columnsWithWrongType = getColumnsWithWrongType(data, columns);
  data = columnsWithWrongType.length ? convertToColumnTypes(data, columnsWithWrongType) : data;

  data = filterData(data, columns);
  data = sortData(columns, data);

  let groupColumnsCount = 0;
  let groupedColumns: Column[] = [];
  if (groups) {
    groupColumnsCount = groups.length;
    groupedColumns = columns.filter((c) => groups.some((g) => g.columnKey === c.key));
    columns = columns.filter((c) => !groups.some((g) => g.columnKey === c.key));
  }

  const dispatch = wrapDispatch(props);

  const componentProps: React.HTMLAttributes<HTMLTableElement> = {
    className: defaultOptions.css.table,
  };

  const tableProps = extendProps(componentProps, props, childAttributes.table, dispatch);
  return (
    <div className='ka' >
      <table {...tableProps}>
        <thead className={defaultOptions.css.thead}>
          <HeadRow
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
            columns={columns}
            childAttributes={childAttributes}
            data={data}
            editableCells={editableCells}
            editingMode={editingMode}
            groupColumnsCount={groupColumnsCount}
            groupedColumns={groupedColumns}
            dispatch={dispatch}
            selectedRows={selectedRows}
        />
      </table>
    </div >
  );
};
