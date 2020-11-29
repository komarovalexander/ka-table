import * as React from 'react';

import { EditingMode, FilteringMode, SortingMode } from '../../enums';
import { EditableCell, PagingOptions } from '../../models';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import { ILoadingProps, IUncontrollableTableProps } from '../../props';
import { DispatchFunc, FormatFunc, SearchFunc, ValidationFunc } from '../../types';
import { ControllableTable } from '../ControllableTable/ControllableTable';
import { UncontrollableTable } from '../UncontrollableTable/UncontrollableTable';

export interface ITableProps {
  columnReordering?: boolean;
  columns: Column[];
  data?: any[];
  detailsRows?: any[];
  editableCells?: EditableCell[];
  editingMode?: EditingMode;
  extendedFilter?: (data: any[]) => any[];
  filteringMode?: FilteringMode;
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
  sortingMode?: SortingMode;
  validation?: ValidationFunc;
  virtualScrolling?: VirtualScrolling;
  width?: number | string;
}

export interface ITableAllProps extends ITableProps {
  childComponents?: ChildComponents;
  dispatch: DispatchFunc;
  state?: { get:  () => ITableProps };
}

export const Table: React.FunctionComponent<IUncontrollableTableProps> = (props) => {
  if (props.dispatch){
    return (
      <ControllableTable {...props} dispatch={props.dispatch} />
    );
  } else {
    return (
      <UncontrollableTable {...props} />
    );
  }
};
