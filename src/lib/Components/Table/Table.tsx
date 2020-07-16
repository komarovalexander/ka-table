import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, FilteringMode, SortingMode } from '../../enums';
import { EditableCell } from '../../models';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { DispatchFunc, FormatFunc, SearchFunc, ValidationFunc } from '../../types';
import { wrapDispatch } from '../../Utils/ActionUtils';
import { getElementCustomization } from '../../Utils/CoponentUtils';
import { getExpandedGroups } from '../../Utils/GroupUtils';
import { prepareTableOptions } from '../../Utils/PropsUtils';
import FilterRow from '../FilterRow/FilterRow';
import HeadRow from '../HeadRow/HeadRow';
import Loading, { ILoadingProps } from '../Loading/Loading';
import Paging, { IPagingProps } from '../Paging/Paging';
import TableBody from '../TableBody/TableBody';

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
  paging?: IPagingProps;
  rowKeyField: string;
  searchText?: string;
  selectedRows?: any[];
  sortingMode?: SortingMode;
  virtualScrolling?: VirtualScrolling;
}
export interface ITableOperations {
  extendedFilter?: (data: any[]) => any[];
  dataCellFormat?: FormatFunc;
  dataCellSearch?: SearchFunc;
  dataCellValidation?: ValidationFunc;
}

export interface ITableEvents {
  dispatch: DispatchFunc;
}

export interface ITableAllProps extends ITableEvents, ITableProps, ITableOperations {
  childComponents?: ChildComponents;
}

export const Table: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    childComponents = {},
    data = [],
    editableCells = [],
    editingMode = EditingMode.None,
    filteringMode,
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
          <thead className={defaultOptions.css.thead} ref={theadRef}>
            <HeadRow
              areAllRowsSelected={areAllRowsSelected}
              childComponents={childComponents}
              columns={preparedOptions.columns}
              dispatch={dispatch}
              groupColumnsCount={preparedOptions.groupColumnsCount}
              sortingMode={sortingMode}
            />
            {filteringMode === FilteringMode.FilterRow &&
              (
                <FilterRow
                  childComponents={childComponents}
                  columns={preparedOptions.columns}
                  dispatch={dispatch}
                  groupColumnsCount={preparedOptions.groupColumnsCount}
                />
              )}
          </thead>
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
