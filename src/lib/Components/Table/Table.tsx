import * as React from 'react';

import { EditingMode, FilteringMode, SortingMode } from '../../enums';
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
import { TableControlled } from '../TableControlled/TableControlled';
import { ITableInstance, TableUncontrolled } from '../TableUncontrolled/TableUncontrolled';

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

export interface IKaTableProps extends ITableProps {
  childComponents?: ChildComponents;
  dispatch?: DispatchFunc;
  table?: ITableInstance
}


export const Table: React.FunctionComponent<IKaTableProps> = (props) => {
  const { dispatch } = props;

  return dispatch ? (
    <TableControlled {...props} dispatch={dispatch}/>
  ) : (
    <TableUncontrolled {...props}/>
  );
};
