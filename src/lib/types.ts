import { PropsWithChildren } from 'react';

import { ICellContentProps } from './Components/CellContent/CellContent';
import { ICellEditorProps, IFilterRowEditorProps } from './Components/CellEditor/CellEditor';
import { IDataRowProps } from './Components/DataRowContent/DataRowContent';
import { IGroupRowProps } from './Components/GroupRowContent/GroupRowContent';
import { IHeadCellProps } from './Components/HeadCell/HeadCell';
import { AttributeTableData, Column } from './models';

type AddParameters<T, I> =
T extends (e: infer E) => void ? (
    (e: E, extendedEvent: AttributeTableData<I>) => void
) : T;
type WithExtraParameters<T, I> = {
  [P in keyof T ] : AddParameters<T[P], I>;
};
type ElementAttributes<T> = React.HTMLAttributes<HTMLElement>;

export type CellFunc = (props: CellFuncPropsWithChildren) => any;
export type CellFuncPropsWithChildren = PropsWithChildren<ICellContentProps>;
export type ChildAttributesItem<T> = WithExtraParameters<ElementAttributes<T>, T>;
export type DataChangeFunc = (data: any[]) => void;
export type DataRowFunc = (props: DataRowFuncPropsWithChildren) => any;
export type DataRowFuncPropsWithChildren = PropsWithChildren<IDataRowProps>;
export type DispatchFunc = (action: any) => void;
export type EditorFunc = (props: EditorFuncPropsWithChildren) => any;
export type EditorFuncPropsWithChildren = PropsWithChildren<ICellEditorProps>;
export type EventFunc = (type: string, data: any) => void;
export type Field = string;
export type FilterRowFunc = (props: FilterRowFuncPropsWithChildren) => any;
export type FilterRowFuncPropsWithChildren = PropsWithChildren<IFilterRowEditorProps>;
export type GroupCellFunc = (props: IGroupRowProps) => any;
export type GroupRowFunc = (props: IGroupRowProps) => any;
export type HeaderCellFunc = (props: HeaderCellFuncPropsWithChildren) => any;
export type HeaderCellFuncPropsWithChildren = PropsWithChildren<IHeadCellProps>;
export type NoDataRowFunc = () => any;
export type OptionChangeFunc = (value: any) => void;
export type FormatFunc = (props: { value: any, column: Column }) => any;
export type SearchFunc = (props: { searchText: string, rowData: any, column: Column }) => boolean;
export type ValidationFunc = (props: { value: any, rowData: any, column: Column }) => string | void;
