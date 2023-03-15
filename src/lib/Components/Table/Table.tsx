import * as React from 'react';
import * as actionCreators from '../../actionCreators';

import { ControlledPropsKeys, DispatchFunc, FilterFunc, FormatFunc, NoData, OnDispatchFunc, SearchFunc, SortFunc, ValidationFunc } from '../../types';
import { EditableCell, PagingOptions } from '../../models';
import { EditingMode, FilteringMode, SortingMode } from '../../enums';

import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { Focused } from '../../Models/Focused';
import { Group } from '../../Models/Group';
import { GroupPanelSettings } from '../../Models/GroupPanelSettings';
import { GroupedColumn } from '../../Models/GroupedColumn';
import { ILoadingProps } from '../../props';
import { TableControlled } from '../TableControlled/TableControlled';
import { TableUncontrolled } from '../TableUncontrolled/TableUncontrolled';
import { VirtualScrolling } from '../../Models/VirtualScrolling';

type ActionCreators = typeof actionCreators;
export interface ITableInstance extends ActionCreators {
  props: ITableProps;
  changeProps: React.Dispatch<React.SetStateAction<ITableProps>>;
  onDispatch: OnDispatchFunc;
  dispatch: DispatchFunc;
}

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
  groupPanel?: GroupPanelSettings;
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
  noData?: NoData,
  sortingMode?: SortingMode;
  validation?: ValidationFunc;
  virtualScrolling?: VirtualScrolling;
  width?: number | string;
  controlledPropsKeys?: ControlledPropsKeys;
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
  table?: ITableInstance;
}

export const Table: React.FunctionComponent<IKaTableProps> = (props) => {
  const { dispatch } = props;

  return dispatch ? (
    <TableControlled
      {...props}
      dispatch={dispatch}
    />
  ) : (
    <TableUncontrolled {...props} />
  );
};
