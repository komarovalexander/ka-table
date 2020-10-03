import { EditingMode, FilteringMode, SortingMode } from './enums';
import { ChildComponents, Column, EditableCell, Group, VirtualScrolling } from './models';
import { GroupedColumn } from './Models/GroupedColumn';
import { DispatchFunc, Field, FormatFunc, ValidationFunc } from './types';

interface IRowCommonProps {
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  editableCells: EditableCell[];
  editingMode: EditingMode;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  selectedRows: any[];
}

export interface ICellProps {
  childComponents: ChildComponents;
  column: Column;
  dispatch: DispatchFunc;
  editingMode: EditingMode;
  editorValue?: any;
  field: Field;
  format?: FormatFunc;
  hasEditorValue?: any;
  isDetailsRowShown: boolean;
  isEditableCell: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  selectedRows: any[];
  validation?: ValidationFunc;
  validationMessage?: string;
  value: any;
}

export interface IFilterRowEditorProps {
  childComponents: ChildComponents;
  column: Column;
  dispatch: DispatchFunc;
}

export interface ICellEditorProps extends IFilterRowEditorProps {
  autoFocus?: boolean;
  editingMode: EditingMode;
  editorValue?: any;
  field: Field;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  value: any;
  selectedRows: any[];
  validationMessage?: string;
  validation?: ValidationFunc;
}

export interface ICellTextProps {
  childComponents: ChildComponents;
  column: Column;
  dispatch: DispatchFunc;
  editingMode: EditingMode;
  field: Field;
  format?: FormatFunc;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  selectedRows: any[];
  value: any;
}

export interface IDataRowProps extends IRowCommonProps {
  format?: FormatFunc;
  validation?: ValidationFunc;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  rowEditableCells: EditableCell[]
}

export interface IGroupRowProps {
  childComponents: ChildComponents;
  column: Column;
  contentColSpan: number;
  dispatch: DispatchFunc;
  groupIndex: number;
  groupKey: any[];
  isExpanded: boolean;
  text: string;
}

export interface IHeadCellProps {
  areAllRowsSelected: boolean;
  childComponents: ChildComponents;
  columnReordering?: boolean;
  column: Column;
  dispatch: DispatchFunc;
  sortingMode: SortingMode;
  colSpan?: number;
  rowSpan?: number;
}

export interface INoDataRowProps {
  childComponents: ChildComponents,
  columns: Column[];
  groupColumnsCount: number;
}

export interface ITableHeadProps {
  columnReordering?: boolean;
  groupedColumns?: GroupedColumn[];
  areAllRowsSelected: boolean;
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  filteringMode: FilteringMode;
  groupColumnsCount: number;
  sortingMode: SortingMode;
}

export interface ITableBodyProps {
  childComponents: ChildComponents;
  columns: Column[];
  data: any[];
  detailsRows?: any[];
  dispatch: DispatchFunc;
  editableCells: EditableCell[];
  editingMode: EditingMode;
  format?: FormatFunc;
  groupColumnsCount: number;
  groupedColumns: Column[];
  groups?: Group[];
  groupsExpanded?: any[][];
  rowKeyField: string;
  rowReordering: boolean;
  selectedRows: any[];
  validation?: ValidationFunc;
  virtualScrolling?: VirtualScrolling;
}

export interface INewRowProps {
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  editableCells: EditableCell[];
  format?: FormatFunc;
  groupColumnsCount: number;
  rowKeyField: string;
  validation?: ValidationFunc;
}

export interface IRowProps extends IRowCommonProps {
  format?: FormatFunc;
  groupColumnsCount: number;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  rowEditableCells: EditableCell[],
  rowReordering: boolean;
  trRef?: any;
  validation?: ValidationFunc;
}

export interface IEmptyCellsProps {
  count: number;
  isTh?: boolean;
  className?: string;
}

export interface ICellEditorValidationMessageProps {
  message: string;
}

export interface IFilterRowProps {
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  groupColumnsCount: number;
}

export interface IHeadRowProps {
  areAllRowsSelected: boolean;
  childComponents: ChildComponents;
  columnReordering?: boolean;
  columns: Column[];
  dispatch: DispatchFunc;
  groupColumnsCount: number;
  groupedColumns?: GroupedColumn[];
  sortingMode: SortingMode;
}

export interface ILoadingProps {
  enabled?: boolean;
  text?: string;
}

export interface IPagingProps {
  enabled?: boolean;
  pageIndex?: number;
  pageSize?: number;
  pagesCount?: number;
  childComponents: ChildComponents;
  dispatch: DispatchFunc;
}

export interface IPagingIndexProps extends IPagingProps {
  isActive: boolean;
  pageIndex: number;
  text: any;
}
export interface IPagingPagesProps extends IPagingProps {
  pages: number[];
}