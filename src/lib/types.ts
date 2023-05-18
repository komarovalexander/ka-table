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
export type OnDispatchFunc = (action: any, tableProps: ITableProps) => void;
export type ControlledPropsKeys = (keyof ITableProps)[];
export type Field = string;
export type FormatFunc = (props: { value: any, column: Column }) => any;
export type FilterFunc = (props: { column: Column }) => ((value: any, filterRowValue: any, rowData?: any) => boolean) | void;
export type SortFunc = (props: { column: Column }) =>  ((value1: any, value2: any) => 0 | 1 | -1) | void;
export type SearchFunc = (props: { searchText: string, rowData: any, column: Column }) => boolean;
export type ValidationFunc = (props: { value: any, rowData: any, column: Column }) => string | void;
