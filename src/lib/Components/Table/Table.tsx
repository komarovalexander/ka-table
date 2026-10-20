import * as React from 'react';
import * as actionCreators from '../../actionCreators';

import { ControlledPropsKeys, CustomReducerFunc, DispatchFunc, FilterFunc, FormatFunc, NoData, OnDispatchFunc, SearchFunc, SortFunc, ValidationFunc } from '../../types';
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
    customReducer?: CustomReducerFunc;
}

export interface ITableProps<TData= any> {
    columnReordering?: boolean;
    columnResizing?: boolean;
    columns: Column<TData>[];
    controlledPropsKeys?: ControlledPropsKeys;
    data?: TData[];
    detailsRows?: any[];
    editableCells?: EditableCell[];
    editingMode?: EditingMode;
    extendedFilter?: (data: TData[]) => TData[];
    extendedSort?: (data: TData[], columns: Column[]) => TData[];
    filter?: FilterFunc<TData>;
    filteringMode?: FilteringMode;
    focused?: Focused;
    format?: FormatFunc<TData>;
    groupedColumns?: GroupedColumn[];
    groupPanel?: GroupPanelSettings;
    groups?: Group[];
    groupsExpanded?: any[][];
    height?: number | string;
    /**
     * Navigation by the cells with the keyboard (the grid pattern of WAI-ARIA), enabled by default: the table is a single stop of Tab,
     * arrows move the focus between the cells (with Ctrl to the last one), Home and End to the first and the last cell
     * of the row (with Ctrl of the page), PageUp and PageDown change the page, Enter and F2 open the editor.
     * The focused cell is kept in focused.cell. false turns the navigation off, e.g. for an own handling of the keys.
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
    search?: SearchFunc<TData>;
    searchText?: string;
    selectedRows?: any[];
    singleAction?: any;
    sort?: SortFunc;
    sortingMode?: SortingMode;
    treeExpandButtonColumnKey?: string;
    treeGroupKeyField?: string;
    treeGroupsExpanded?: any[];
    validation?: ValidationFunc<TData>;
    virtualScrolling?: VirtualScrolling;
    width?: number | string;
}

export interface ITableEvents {
    dispatch: DispatchFunc;
}

export interface ITableAllProps extends ITableEvents, ITableProps {
    childComponents?: ChildComponents;
}

export interface IKaTableProps<TData= any> extends ITableProps<TData> {
    childComponents?: ChildComponents<TData>;
    dispatch?: DispatchFunc;
    table?: ITableInstance;
}

export const Table = <TData= any>(props: IKaTableProps<TData>) => {
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
