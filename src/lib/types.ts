import { AttributeTableData, Column } from './models';

type AddParameters<T, I> =
T extends (e: infer E) => void ? (
    (e: E, extendedEvent: AttributeTableData<I>) => void
) : T;
type WithExtraParameters<T, I> = {
  [P in keyof T ] : AddParameters<T[P], I>;
};
type ElementAttributes<T> = React.AllHTMLAttributes<HTMLElement>;

export type ChildAttributesItem<T> = WithExtraParameters<ElementAttributes<T>, T>;
export type DispatchFunc = (action: any) => void;
export type Field = string;
export type FormatFunc = (props: { value: any, column: Column }) => any;
export type SearchFunc = (props: { searchText: string, rowData: any, column: Column }) => boolean;
export type ValidationFunc = (props: { value: any, rowData: any, column: Column }) => string | void;
