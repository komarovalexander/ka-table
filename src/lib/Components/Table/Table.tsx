import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, FilteringMode, SortingMode } from '../../enums';
import { EditableCell } from '../../models';
import { ChildAttributes } from '../../Models/ChildAttributes';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { DataRowFunc, DispatchFunc, GroupRowFunc, NoDataRowFunc } from '../../types';
import { wrapDispatch } from '../../Utils/ActionUtils';
import { getExpandedGroups } from '../../Utils/GroupUtils';
import { extendProps, prepareTableOptions } from '../../Utils/PropsUtils';
import FilterRow from '../FilterRow/FilterRow';
import HeadRow from '../HeadRow/HeadRow';
import TableBody from '../TableBody/TableBody';

/**
 * Sets the options of the table which are related to its looks
 */
export interface ITableProps {
  columns: Column[];
  dataRow?: DataRowFunc;
  editableCells?: EditableCell[];
  editingMode?: EditingMode;
  extendedFilter?: (data: any[]) => any[];
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
  dispatch: DispatchFunc;
}

export interface ITableAllProps extends ITableEvents, ITableProps {
  childAttributes?: ChildAttributes;
}

export const Table: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    childAttributes = {},
    editableCells = [],
    editingMode = EditingMode.None,
    filteringMode,
    sortingMode = SortingMode.None,
    selectedRows = [],
    groups,
    data = [],
  } = props;
  let {
    groupsExpanded,
  } = props;

  const preparedOptions = prepareTableOptions(props);
  if (groups && !groupsExpanded) {
    groupsExpanded = getExpandedGroups(preparedOptions.groupedData);
  }

  const theadRef = React.useRef<HTMLTableSectionElement>(null);
  const dispatch = wrapDispatch({ ...props }, theadRef);

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
            groupColumnsCount={preparedOptions.groupColumnsCount}
            columns={preparedOptions.columns}
            dispatch={dispatch}
            sortingMode={sortingMode}
          />
          {filteringMode === FilteringMode.FilterRow &&
            (
              <FilterRow
                columns={preparedOptions.columns}
                dispatch={dispatch}
                groupColumnsCount={preparedOptions.groupColumnsCount}
              />
            )}
        </thead>
        <TableBody
            {...props}
            childAttributes={childAttributes}
            columns={preparedOptions.columns}
            data={preparedOptions.groupedData}
            dispatch={dispatch}
            editableCells={editableCells}
            editingMode={editingMode}
            groupColumnsCount={preparedOptions.groupColumnsCount}
            groupedColumns={preparedOptions.groupedColumns}
            groupsExpanded={groupsExpanded}
            selectedRows={selectedRows}
        />
      </table>
    </div >
  );
};
