import { ChildComponents, Column, EditableCell, Group, VirtualScrolling } from './models';
import { DispatchFunc, Field, FormatFunc, NoData, ValidationFunc } from './types';
import { EditingMode, FilteringMode, SortingMode } from './enums';

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

interface IRowCommonProps<T = any> {
    childComponents: ChildComponents;
    columns: Column[];
    treeDeep?: number;
    treeExpandButtonColumnKey?: string;
    dispatch: DispatchFunc;
    editableCells: EditableCell[];
    editingMode: EditingMode;
    index?: number;
    isTreeExpanded?: boolean;
    isTreeGroup?: boolean;
    rowData: T;
    rowKeyField: string;
    rowKeyValue: any;
    selectedRows: any[];
}

export interface ICellProps<T= any> {
    treeArrowElement?: any;
    childComponents: ChildComponents;
    column: Column;
    treeDeep?: number;
    dispatch: DispatchFunc;
    editingMode: EditingMode;
    editorValue?: any;
    field: Field;
    format?: FormatFunc;
    hasEditorValue?: any;
    isDetailsRowShown: boolean;
    isEditableCell: boolean;
    isSelectedRow: boolean;
    rowData: T;
    rowKeyField: string;
    rowKeyValue: any;
    selectedRows: any[];
    validation?: ValidationFunc;
    validationMessage?: string;
    value: any;
}

export interface IFilterRowEditorProps {
    childComponents?: ChildComponents;
    column: Column;
    dispatch: DispatchFunc;
}

export interface ICellEditorProps<T= any> extends IFilterRowEditorProps {
    autoFocus?: boolean;
    editingMode: EditingMode;
    editorValue?: any;
    field: Field;
    isDetailsRowShown: boolean;
    isSelectedRow: boolean;
    rowData: T;
    rowKeyField: string;
    rowKeyValue: any;
    value: any;
    selectedRows: any[];
    validationMessage?: string;
    validation?: ValidationFunc;
}

export interface ICellTextProps<T= any> {
    childComponents: ChildComponents;
    column: Column;
    dispatch: DispatchFunc;
    editingMode: EditingMode;
    field: Field;
    format?: FormatFunc;
    isDetailsRowShown: boolean;
    isSelectedRow: boolean;
    rowData: T;
    rowKeyField: string;
    rowKeyValue: any;
    selectedRows: any[];
    value: any;
}

export interface IDataRowProps<T= any> extends IRowCommonProps<T> {
    format?: FormatFunc;
    validation?: ValidationFunc;
    isDetailsRowShown: boolean;
    isSelectedRow: boolean;
    rowEditableCells: EditableCell[];
}

export interface IGroupRowProps<T> {
    childComponents: ChildComponents;
    column: Column;
    columns?: Column[];
    groupedColumns?: Column[];
    contentColSpan: number;
    dispatch: DispatchFunc;
    groupIndex: number;
    groupKey: any[];
    isExpanded: boolean;
    text: string;
    groupItems?: T[];
}

export interface IGroupSummaryRowProps extends IRowsProps {
    groupData: any[];
    groupIndex: number;
}

export interface IGroupSummaryCellProps extends IGroupSummaryRowProps {
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

export interface ITableBodyProps {
    childComponents: ChildComponents;
    columns: Column[];
    data: any[];
    loading?: ILoadingProps;
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
    noData?: NoData;
    validation?: ValidationFunc;
    virtualScrolling?: VirtualScrolling;
    treeExpandButtonColumnKey?: string;
}

export interface ITableFootProps extends ITableAllProps {
    data: any[];
    groupColumnsCount: number;
}
export interface ISummaryRowProps extends ITableFootProps {
}
export interface ISummaryCellProps extends ISummaryRowProps {
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
    text: any;
}

export interface IPopupContentProps {
    column: Column;
    childComponents?: ChildComponents;
    data?: any[];
    dispatch: DispatchFunc;
    format?: FormatFunc;
}

export interface IPopupContentItemProps {
    column: Column;
    childComponents?: ChildComponents;
    item?: any;
    dispatch: DispatchFunc;
}

export interface IPopupProps {
    column: Column;
    childComponents?: ChildComponents;
    data?: any[];
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
