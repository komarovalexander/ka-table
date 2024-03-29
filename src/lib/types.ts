import { AttributeTableData, Column } from './models';

import { ITableProps } from './Components/Table/Table';

export interface NoData {
    text?: string;
    hideHeader?: boolean;
}

type AddParameters<T, I> = T extends (e: infer E) => void ? (
    (e: E, extendedEvent: AttributeTableData<I>) => void
) : T;
type WithExtraParameters<T, I> = {
    [P in keyof T ] : AddParameters<T[P], I>;
};
type ElementAttributes<T> = React.AllHTMLAttributes<HTMLElement>;

export type ChildAttributesItem<T> = WithExtraParameters<ElementAttributes<T>, T> & { ref?: any };
export type DispatchFunc = (action: any) => void;
export type CustomReducerFunc = (nextState: ITableProps, action: any, prevState: ITableProps) => ITableProps;
export type OnDispatchFunc = (action: any, tableProps: ITableProps) => void;
export type ControlledPropsKeys = (keyof ITableProps)[];
export type Field = string;
export type FormatFunc<TData= any> = (props: { value: any, column: Column, rowData?: TData; }) => any;
export type FilterFunc<TData= any> = (props: { column: Column }) => ((value: any, filterRowValue: any, rowData?: TData) => boolean) | void;
export type SortFunc<TData= any> = (props: { column: Column }) =>  ((value1: TData, value2: TData) => 0 | 1 | -1) | void;
export type SearchFunc<TData= any> = (props: { searchText: string, rowData: TData, column: Column }) => boolean;
export type ValidationFunc<TData= any> = (props: { value: any, rowData: TData, column: Column }) => string | void;
