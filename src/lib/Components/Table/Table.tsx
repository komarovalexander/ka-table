import * as React from 'react';

import { clearSingleAction } from '../../actionCreators';
import { EditingMode, FilteringMode, PagingPosition, SortingMode } from '../../enums';
import { EditableCell, PagingOptions } from '../../models';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { Focused } from '../../Models/Focused';
import { Group } from '../../Models/Group';
import { GroupedColumn } from '../../Models/GroupedColumn';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { ILoadingProps } from '../../props';
import {
  DispatchFunc, FilterFunc, FormatFunc, SearchFunc, SortFunc, ValidationFunc,
} from '../../types';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isPagingShown } from '../../Utils/PagingUtils';
import Loading from '../Loading/Loading';
import Popup from '../Popup/Popup';
import { TablePaging } from '../TablePaging/TablePaging';
import { TableWrapper } from '../TableWrapper/TableWrapper';

export interface ITableProps {
  columnReordering?: boolean;
  columnResizing?: boolean;
  columns: Column[];
  groupedColumns?: GroupedColumn[];
  data?: any[];
  detailsRows?: any[];
  editableCells?: EditableCell[];
  editingMode?: EditingMode;
  extendedFilter?: (data: any[]) => any[];
  filter?: FilterFunc;
  filteringMode?: FilteringMode;
  focused?: Focused;
  format?: FormatFunc;
  groups?: Group[];
  groupsExpanded?: any[][];
  height?: number | string;
  loading?: ILoadingProps;
  paging?: PagingOptions;
  rowKeyField: string;
  treeGroupKeyField?: string;
  treeGroupsExpanded?: any[];
  treeExpandButtonColumnKey?: string;
  rowReordering?: boolean;
  search?: SearchFunc;
  searchText?: string;
  selectedRows?: any[];
  singleAction?: any;
  sort?: SortFunc;
  sortingMode?: SortingMode;
  validation?: ValidationFunc;
  virtualScrolling?: VirtualScrolling;
  width?: number | string;
}

export interface ITableEvents {
  dispatch: DispatchFunc;
}

export interface ITableAllProps extends ITableEvents, ITableProps {
  childComponents?: ChildComponents;
}

export const Table: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    childComponents,
    columns,
    dispatch,
    data,
    format,
    height,
    loading,
    width,
    paging,
    singleAction
  } = props;
  const isLoadingActive = loading && loading.enabled;
  const kaCss = isLoadingActive ? 'ka ka-loading-active' : 'ka';

  const { elementAttributes, content: rootDivContent } = getElementCustomization({
    className: kaCss
  }, props, childComponents?.rootDiv);
  elementAttributes.style = { width, height, ...elementAttributes.style }

  React.useEffect(() => {
    if (singleAction) {
      dispatch(singleAction);
      dispatch(clearSingleAction());
    }
  });


  return (
    <div {...elementAttributes}>
      {rootDivContent || (
        <>
          {isPagingShown(PagingPosition.Top, paging) && <TablePaging {...props} />}
          <TableWrapper {...props} />
          {isPagingShown(PagingPosition.Bottom, paging) && <TablePaging {...props} />}
          <Loading {...loading} childComponents={childComponents}/>
          {columns.map(column =>
            column.isHeaderFilterPopupShown
            && (
              <Popup
                key={column.key}
                column={column}
                childComponents={childComponents}
                data={data}
                dispatch={dispatch}
                format={format}
              />
            )
          )}
        </>
      )}
    </div>
  );
};
