import * as React from 'react';

import { clearSingleAction } from '../../actionCreators';
import { EditingMode, FilteringMode, SortingMode } from '../../enums';
import { EditableCell, PagingOptions } from '../../models';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { Focused } from '../../Models/Focused';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { ILoadingProps } from '../../props';
import { DispatchFunc, FormatFunc, SearchFunc, ValidationFunc } from '../../types';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getPagesCountByProps } from '../../Utils/PropsUtils';
import Loading from '../Loading/Loading';
import Paging from '../Paging/Paging';
import { TableWrapper } from '../TableWrapper/TableWrapper';

export interface ITableProps {
  columnReordering?: boolean;
  columnResizing?: boolean;
  columns: Column[];
  data?: any[];
  detailsRows?: any[];
  editableCells?: EditableCell[];
  editingMode?: EditingMode;
  extendedFilter?: (data: any[]) => any[];
  filteringMode?: FilteringMode;
  focused?: Focused;
  format?: FormatFunc;
  groups?: Group[];
  groupsExpanded?: any[][];
  height?: number | string;
  loading?: ILoadingProps;
  paging?: PagingOptions;
  rowKeyField: string;
  rowReordering?: boolean;
  search?: SearchFunc;
  searchText?: string;
  selectedRows?: any[];
  singleAction?: any;
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
    childComponents = {},
    dispatch,
    height,
    loading,
    paging,
    width,
    singleAction
  } = props;
  const isLoadingActive = loading && loading.enabled;
  const kaCss = isLoadingActive ? 'ka ka-loading-active' : 'ka';

  const { elementAttributes, content: rootDivContent } = getElementCustomization({
    className:  kaCss
  }, props, childComponents.rootDiv);
  elementAttributes.style = {width, height, ...elementAttributes.style}

  React.useEffect(() => {
    if (singleAction){
      dispatch(singleAction);
      dispatch(clearSingleAction());
    }
  });
  return (
    <div {...elementAttributes}>
      {rootDivContent || <TableWrapper {...props} />}
      <Paging
        {...paging}
        dispatch={dispatch}
        childComponents={childComponents}
        pagesCount={getPagesCountByProps(props)}
      />
      <Loading
        {...loading}
      />
    </div>
  );
};
