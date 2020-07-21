import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, FilteringMode, SortingMode } from '../../enums';
import { EditableCell, PagingOptions } from '../../models';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { ILoadingProps } from '../../props';
import { DispatchFunc, FormatFunc, SearchFunc, ValidationFunc } from '../../types';
import { wrapDispatch } from '../../Utils/ActionUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getExpandedGroups } from '../../Utils/GroupUtils';
import { prepareTableOptions } from '../../Utils/PropsUtils';
import Loading from '../Loading/Loading';
import Paging from '../Paging/Paging';
import TableBody from '../TableBody/TableBody';
import { TableHead } from '../TableHead/TableHead';

export interface ITableProps {
  columns: Column[];
  data?: any[];
  format?: FormatFunc;
  search?: SearchFunc;
  validation?: ValidationFunc;
  detailsRows?: any[];
  editableCells?: EditableCell[];
  editingMode?: EditingMode;
  extendedFilter?: (data: any[]) => any[];
  filteringMode?: FilteringMode;
  groups?: Group[];
  groupsExpanded?: any[][];
  loading?: ILoadingProps;
  paging?: PagingOptions;
  rowKeyField: string;
  rowReordering?: boolean;
  searchText?: string;
  selectedRows?: any[];
  sortingMode?: SortingMode;
  virtualScrolling?: VirtualScrolling;
}

export interface ITableEvents {
  dispatch: DispatchFunc;
}

export interface ITableAllProps extends ITableEvents, ITableProps {
  childComponents?: ChildComponents;
}

export const Table: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    data = [],
    childComponents = {},
    editableCells = [],
    editingMode = EditingMode.None,
    filteringMode = FilteringMode.None,
    rowReordering = false,
    groups,
    loading,
    paging,
    selectedRows = [],
    sortingMode = SortingMode.None,
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

  const areAllRowsSelected = data.length === selectedRows.length;
  const isLoadingActive = loading && loading.enabled;
  const kaCss = isLoadingActive ? 'ka ka-loading-active' : 'ka';

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.table,
  }, { ...props, dispatch }, childComponents.table);
  return (
    <div className={kaCss}>
      {content ||
      (
        <table {...elementAttributes}>
          <TableHead
            areAllRowsSelected={areAllRowsSelected}
            childComponents={childComponents}
            columns={preparedOptions.columns}
            dispatch={dispatch}
            filteringMode={filteringMode}
            groupColumnsCount={preparedOptions.groupColumnsCount}
            sortingMode={sortingMode}
            theadRef={theadRef}
          />
          <TableBody
              {...props}
              childComponents={childComponents}
              columns={preparedOptions.columns}
              data={preparedOptions.groupedData}
              dispatch={dispatch}
              editableCells={editableCells}
              editingMode={editingMode}
              groupColumnsCount={preparedOptions.groupColumnsCount}
              groupedColumns={preparedOptions.groupedColumns}
              groupsExpanded={groupsExpanded}
              rowReordering={rowReordering}
              selectedRows={selectedRows}
          />
        </table>
      )
    }
      <Paging
        {...paging}
        dispatch={dispatch}
        pagesCount={preparedOptions.pagesCount}
      />
      <Loading
        {...loading}
      />
    </div >
  );
};
