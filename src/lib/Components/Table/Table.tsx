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
    groupedColumns?: GroupedColumn[];
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
    search?: SearchFunc<TData>;
    searchText?: string;
    selectedRows?: any[];
    singleAction?: any;
    sort?: SortFunc;
    noData?: NoData,
    sortingMode?: SortingMode;
    validation?: ValidationFunc<TData>;
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
