import { ChildComponents, Column, EditableCell, Group, VirtualScrolling } from './models';
import { DispatchFunc, Field, FormatFunc, NoData, ValidationFunc } from './types';
import { EditingMode, FilteringMode, SortingMode } from './enums';

import { Focused } from './Models/Focused';
import { GroupPanelSettings } from './Models/GroupPanelSettings';
import { GroupedColumn } from './Models/GroupedColumn';
import { IRowsProps } from './Components/Rows/Rows';
import { ITableAllProps } from './Components/Table/Table';

export interface IGroupPanelProps {
    groupPanel: GroupPanelSettings;
    columns: Column[];
    groups?: Group[];
    dispatch: DispatchFunc,
    sortingMode?: SortingMode,
    filteringMode?: FilteringMode,
    childComponents?: ChildComponents;
}

export interface IGroupPanelCellProps {
    column: Column;
    dispatch: DispatchFunc,
    sortingMode?: SortingMode,
    filteringMode?: FilteringMode,
    childComponents?: ChildComponents;
}
export interface IColGroupProps {
    columns: Column[];
    groupColumnsCount: number;
}

interface IRowCommonProps<TData = unknown> {
    childComponents: ChildComponents;
    columns: Column[];
    // the column of the focused cell (focused.cell) when it is in the row
    focusedColumnKey?: string;
    treeDeep?: number;
    treeExpandButtonColumnKey?: string;
    dispatch: DispatchFunc;
    editableCells: EditableCell[];
    editingMode: EditingMode;
    index?: number;
    isTreeExpanded?: boolean;
    isTreeGroup?: boolean;
    rowData: TData;
    rowKeyField: string;
    rowKeyValue: unknown;
    selectedRows: unknown[];
}

export interface ICellProps<TData = unknown> {
    treeArrowElement?: React.ReactNode;
    childComponents: ChildComponents;
    column: Column;
    treeDeep?: number;
    dispatch: DispatchFunc;
    editingMode: EditingMode;
    editorValue?: unknown;
    field: Field;
    format?: FormatFunc;
    hasEditorValue?: boolean;
    isDetailsRowShown: boolean;
    isEditableCell: boolean;
    /**
     * The cell is focused (focused.cell). With the keyboard navigation it is the cell which gets the focus by Tab:
     * the first cell is focused while focused.cell is not set or is not shown
     */
    isFocused?: boolean;
    isSelectedRow: boolean;
    rowData: TData;
    rowKeyField: string;
    rowKeyValue: unknown;
    selectedRows: unknown[];
    validation?: ValidationFunc;
    validationMessage?: string;
    value: unknown;
}

export interface IFilterRowEditorProps {
    childComponents?: ChildComponents;
    column: Column;
    dispatch: DispatchFunc;
}

export interface ICellEditorProps<TData = unknown> extends IFilterRowEditorProps {
    autoFocus?: boolean;
    editingMode: EditingMode;
    editorValue?: unknown;
    field: Field;
    isDetailsRowShown: boolean;
    isSelectedRow: boolean;
    rowData: TData;
    rowKeyField: string;
    rowKeyValue: unknown;
    value: unknown;
    selectedRows: unknown[];
    validationMessage?: string;
    // the id of the shown validation message: the editor refers to it by aria-describedby
    validationMessageId?: string;
    validation?: ValidationFunc;
}

export interface ICellTextProps<TData = unknown> {
    childComponents: ChildComponents;
    column: Column;
    dispatch: DispatchFunc;
    editingMode: EditingMode;
    field: Field;
    format?: FormatFunc;
    isDetailsRowShown: boolean;
    isSelectedRow: boolean;
    rowData: TData;
    rowKeyField: string;
    rowKeyValue: unknown;
    selectedRows: unknown[];
    value: unknown;
}

export interface IDataRowProps<TData = unknown> extends IRowCommonProps<TData> {
    format?: FormatFunc;
    validation?: ValidationFunc;
    isDetailsRowShown: boolean;
    isSelectedRow: boolean;
    rowEditableCells: EditableCell[];
}

export interface IGroupRowProps<TData = unknown> {
    childComponents: ChildComponents;
    column: Column;
    columns?: Column[];
    groupedColumns?: Column[];
    contentColSpan: number;
    dispatch: DispatchFunc;
    groupIndex: number;
    groupKey: unknown[];
    isExpanded: boolean;
    // the group row is focused by the keyboard navigation
    isFocused?: boolean;
    text: React.ReactNode;
    groupItems?: TData[];
}

export interface IGroupSummaryRowProps<TData = unknown> extends IRowsProps {
    groupData: TData[];
    groupIndex: number;
}

export interface IGroupSummaryCellProps<TData = unknown> extends IGroupSummaryRowProps<TData> {
    column: Column;
}

export interface IHeadCellResizeProps {
    dispatch: DispatchFunc;
    column: Column;
    childComponents: ChildComponents;
}
export interface IHeadCellProps {
    areAllRowsSelected: boolean;
    childComponents: ChildComponents;
    colSpan?: number;
    column: Column;
    columnReordering?: boolean;
    columnResizing?: boolean;
    dispatch: DispatchFunc;
    filteringMode?: FilteringMode;
    groupPanel?: GroupPanelSettings;
    hasChildren?: boolean;
    isGrouped?: boolean;
    rowSpan?: number;
    sortingMode: SortingMode;
}

export interface INoDataRowProps {
    childComponents: ChildComponents;
    loading?: ILoadingProps;
    columns: Column[];
    groupColumnsCount: number;
    noData?: NoData;
}

export interface ITableHeadProps {
    groupPanel?: GroupPanelSettings;
    columnReordering?: boolean;
    groupedColumns?: GroupedColumn[];
    columnResizing?: boolean;
    areAllRowsSelected: boolean;
    childComponents: ChildComponents;
    columns: Column[];
    dispatch: DispatchFunc;
    filteringMode: FilteringMode;
    groupColumnsCount: number;
    sortingMode: SortingMode;
}

export interface ITableBodyProps<TData = unknown> {
    childComponents: ChildComponents;
    // current is true while a column is resized by the mouse: the rows are rendered with the new widths when the resize ends
    columnResizeRef?: { current: boolean };
    columns: Column[];
    data: TData[];
    loading?: ILoadingProps;
    detailsRows?: unknown[];
    dispatch: DispatchFunc;
    editableCells: EditableCell[];
    editingMode: EditingMode;
    focused?: Focused;
    format?: FormatFunc;
    groupColumnsCount: number;
    groupedColumns: Column[];
    groups?: Group[];
    groupsExpanded?: unknown[][];
    keyboardNavigation?: boolean;
    memoizedRows?: boolean;
    oddEvenRows?: boolean;
    rowKeyField: string;
    rowReordering: boolean;
    selectedRows: unknown[];
    noData?: NoData;
    validation?: ValidationFunc;
    virtualScrolling?: VirtualScrolling;
    treeExpandButtonColumnKey?: string;
}

export interface ITableFootProps<TData = unknown> extends ITableAllProps {
    data: TData[];
    groupColumnsCount: number;
}
export interface ISummaryRowProps<TData = unknown> extends ITableFootProps<TData> {
}
export interface ISummaryCellProps<TData = unknown> extends ISummaryRowProps<TData> {
    column: Column;
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
    isOdd?: boolean;
    format?: FormatFunc;
    groupColumnsCount: number;
    isDetailsRowShown: boolean;
    isSelectedRow: boolean;
    rowEditableCells: EditableCell[],
    rowReordering: boolean;
    trRef?: React.Ref<HTMLTableRowElement>;
    validation?: ValidationFunc;
}

export interface IEmptyCellsProps {
    count: number;
    isTh?: boolean;
    isColGroup?: boolean;
    className?: string;
    dispatch?: DispatchFunc;
    childComponents?: ChildComponents;
}

export interface IEmptyCellProps {
    index?: number;
    isTh?: boolean;
    isColGroup?: boolean;
    className?: string;
    dispatch?: DispatchFunc;
    childComponents?: ChildComponents;
}

export interface ICellEditorValidationMessageProps {
    id?: string;
    message: string;
}

export interface IFilterRowProps {
    childComponents?: ChildComponents;
    columns: Column[];
    dispatch: DispatchFunc;
    groupColumnsCount: number;
}

export interface IHeadRowProps {
    areAllRowsSelected: boolean;
    childComponents: ChildComponents;
    columnReordering?: boolean;
    columnResizing?: boolean;
    columns: Column[];
    dispatch: DispatchFunc;
    filteringMode?: FilteringMode;
    groupColumnsCount: number;
    groupedColumns?: GroupedColumn[];
    groupPanel?: GroupPanelSettings;
    sortingMode: SortingMode;
}

export interface ILoadingProps {
    childComponents?: ChildComponents;
    enabled?: boolean;
    text?: string;
}

export interface IPagingProps {
    childComponents: ChildComponents;
    dispatch: DispatchFunc;
    enabled?: boolean;
    pageIndex?: number;
    pageSize?: number;
    pageSizes?: number[];
    pagesCount?: number;
}
export interface IPagingSizeProps extends IPagingProps {
    value: number;
}

export interface IPagingIndexProps extends IPagingProps {
    isActive: boolean;
    pageIndex: number;
    text: string | number;
}

export interface IPopupContentProps<TData = unknown> {
    column: Column;
    childComponents?: ChildComponents;
    data?: TData[];
    dispatch: DispatchFunc;
    format?: FormatFunc;
}

export interface IPopupContentItemProps {
    column: Column;
    childComponents?: ChildComponents;
    item?: unknown;
    dispatch: DispatchFunc;
}

export interface IHeaderFilterPopupProps {
    column: Column;
    childComponents?: ChildComponents;
    data?: unknown[];
    dispatch: DispatchFunc;
    format?: FormatFunc;
}

export interface IHeaderFilterButtonProps {
    childComponents?: ChildComponents;
    column: Column,
    dispatch: DispatchFunc;
}

export interface ISortIconProps {
    childComponents?: ChildComponents;
    column: Column,
    dispatch: DispatchFunc;
}
