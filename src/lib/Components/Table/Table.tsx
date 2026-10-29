import * as React from 'react';
import * as actionCreators from '../../actionCreators';

import {
    Bivariant,
    ControlledPropsKeys,
    CustomAction,
    CustomReducerFunc,
    DispatchFunc,
    FilterFunc,
    FormatFunc,
    NoData,
    NoInference,
    OnDispatchFunc,
    SearchFunc,
    SortFunc,
    TableAction,
    ValidationFunc,
} from '../../types';
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
// the methods of the instance dispatch the actions of the action creators
type ActionMethods = { [K in keyof ActionCreators]: (...args: Parameters<ActionCreators[K]>) => void };

export interface ITableInstance<TData = unknown> extends ActionMethods {
    props: ITableProps<TData>;
    // a method with a bivariant function: the instance of a table of the rows of a type is an instance of a table
    changeProps(value: ITableProps<TData> | Bivariant<(prevState: ITableProps<TData>) => ITableProps<TData>>): void;
    onDispatch: OnDispatchFunc<TData>;
    dispatch: DispatchFunc;
    customReducer?: CustomReducerFunc<TData>;
}

/**
 * The type of the rows (TData) is inferred from data and from the instance of useTable<TData>().
 * The other props (columns, childComponents, format, search...) get it and don't infer it,
 * so the ones declared without the type of the rows (e.g. Column[] or FormatFunc) keep the type of data
 */
export interface ITableProps<TData = unknown> {
    columnReordering?: boolean;
    /**
     * The columns are resized by the mouse. While a column is resized, the rows are not processed and rendered again:
     * they don't use the widths, and they are rendered with the new width when the mouse is released.
     * A controlled table doesn't render the rows only if the props which the parent passes keep their references
     * between its renders (dispatch, childComponents, format...), as with memoizedRows
     */
    columnResizing?: boolean;
    columns: Column<NoInference<TData>>[];
    /**
     * The props which the table with its own state (without dispatch) applies when the parent changes them.
     * By default these are all the props: they are compared by value and the objects are merged by the changed fields,
     * so the state of the table (sorting, page, widths...) is kept when the parent passes equal props again.
     * During a loading (loading.enabled) data, columns, paging and selectedRows are applied when the loading ends.
     * The functions (format, filter, search, sort, validation...) are not the state: the latest ones are always used.
     */
    controlledPropsKeys?: ControlledPropsKeys;
    data?: TData[];
    detailsRows?: unknown[];
    editableCells?: EditableCell[];
    editingMode?: EditingMode;
    extendedFilter?: Bivariant<(data: NoInference<TData>[]) => NoInference<TData>[]>;
    extendedSort?: Bivariant<(data: NoInference<TData>[], columns: Column<NoInference<TData>>[]) => NoInference<TData>[]>;
    filter?: FilterFunc<NoInference<TData>>;
    filteringMode?: FilteringMode;
    focused?: Focused;
    format?: FormatFunc<NoInference<TData>>;
    groupedColumns?: GroupedColumn[];
    groupPanel?: GroupPanelSettings;
    groups?: Group[];
    groupsExpanded?: unknown[][];
    height?: number | string;
    /**
     * Navigation by the cells with the keyboard (the grid pattern of WAI-ARIA, treegrid for a tree), enabled by default:
     * the table is a single stop of Tab, arrows move the focus between the cells (with Ctrl to the last one), Home and End
     * to the first and the last cell of the row (with Ctrl of the page), PageUp and PageDown change the page, Enter and F2 open the editor.
     * Group rows get the focus as rows: Enter, Space and the arrows Left and Right expand and collapse them.
     * Enter and Space on the cell of the arrow of a tree row expand and collapse it (F2 opens the editor of this cell).
     * The focus is kept in focused.cell (focused.group for a group row). false turns the navigation off, e.g. for an own handling of the keys.
     */
    keyboardNavigation?: boolean;
    loading?: ILoadingProps;
    /**
     * Rows and their cells are re-rendered only when their own props change, which is much faster for big tables.
     * Customizations of rows and cells (childComponents) have to render from their props then:
     * values read from table.props or from closures during rendering are not updated.
     * childComponents, format, validation and dispatch should keep their references between renders
     * (be declared outside of the component or memoized), otherwise all the rows are re-rendered.
     */
    memoizedRows?: boolean;
    noData?: NoData,
    oddEvenRows?: boolean;
    paging?: PagingOptions;
    rowKeyField: string;
    rowReordering?: boolean;
    search?: SearchFunc<NoInference<TData>>;
    searchText?: string;
    selectedRows?: unknown[];
    singleAction?: TableAction | CustomAction;
    sort?: SortFunc<NoInference<TData>>;
    sortingMode?: SortingMode;
    treeExpandButtonColumnKey?: string;
    treeGroupKeyField?: string;
    treeGroupsExpanded?: unknown[];
    validation?: ValidationFunc<NoInference<TData>>;
    virtualScrolling?: VirtualScrolling;
    width?: number | string;
}

export interface ITableEvents {
    dispatch: DispatchFunc;
}

export interface ITableAllProps extends ITableEvents, ITableProps {
    childComponents?: ChildComponents;
}

export interface IKaTableProps<TData = unknown> extends ITableProps<TData> {
    childComponents?: ChildComponents<NoInference<TData>>;
    dispatch?: DispatchFunc;
    // the instance of useTable() without the type of the rows doesn't change the type of data
    table?: ITableInstance<TData> | ITableInstance;
}

export const Table = <TData = unknown>(props: IKaTableProps<TData>) => {
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
