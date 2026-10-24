import * as actionCreators from './actionCreators';

import { AttributeTableData, Column } from './models';

import { ActionType } from './enums';
import { ITableProps } from './Components/Table/Table';
import { VirtualScrolling } from './Models/VirtualScrolling';

export interface NoData {
    text?: string;
    hideHeader?: boolean;
}

/**
 * A function whose parameters are checked bivariantly, as the ones of the event handlers of React:
 * the functions for the rows of a type (e.g. format of ITableProps<Row>) are the functions of a table, whose rows are unknown inside
 */
export type Bivariant<TFunction extends (...args: never[]) => unknown> = {
    bivarianceHack(...args: Parameters<TFunction>): ReturnType<TFunction>;
}['bivarianceHack'];

/**
 * A type which TypeScript doesn't infer a type parameter from, as NoInfer of TypeScript 5.4 (the older versions don't have it):
 * the type of the rows of a table is inferred from data and the instance, the other props are typed by it
 */
export type NoInference<T> = [T][T extends unknown ? 0 : never];

type AddParameters<T, I> = T extends (e: infer E) => void ? (
    Bivariant<(e: E, extendedEvent: AttributeTableData<I>) => void>
) : T;
type WithExtraParameters<T, I> = {
    [P in keyof T]: AddParameters<T[P], I>;
};
type ElementAttributes = React.AllHTMLAttributes<HTMLElement>;

// a ref of an element of every type: a callback or an object
export type ElementRef = ((element: never) => void) | { current: unknown } | null;

export type ChildAttributesItem<T> = WithExtraParameters<ElementAttributes, T> & { ref?: ElementRef };

type ActionCreators = typeof actionCreators;

// the actions of the table: the ones of the action creators and the ones which the components of the table dispatch
export type TableAction = ReturnType<ActionCreators[keyof ActionCreators]>
    | { type: ActionType.ComponentDidMount }
    | { type: ActionType.ScrollTable; scrollTop: number }
    | { type: ActionType.UpdateVirtualScrolling; virtualScrolling: VirtualScrolling };

// an action of the code which uses the table: customReducer and onDispatch get it with the actions of the table
export interface CustomAction {
    type: string;
    [field: string]: unknown;
}

export type DispatchFunc = (action: TableAction | CustomAction) => void;
// the kinds of the items dragged by a table: a row is dropped only on the rows, a column on the columns and on the group panel
export type DraggableKind = 'row' | 'column';
/**
 * Gets the actions of the table (TableAction): the type of action is checked by action.type.
 * The actions which the code dispatches itself are added to the type of the parameter: (nextState, action: TableAction | MyAction) => ...
 */
export type CustomReducerFunc<TData = unknown> = Bivariant<(nextState: ITableProps<TData>, action: TableAction, prevState: ITableProps<TData>) => ITableProps<TData>>;
/**
 * Gets the actions of the table (TableAction): the type of action is checked by action.type.
 * The actions which the code dispatches itself are added to the type of the parameter: (action: TableAction | MyAction) => ...
 */
export type OnDispatchFunc<TData = unknown> = Bivariant<(action: TableAction, tableProps: ITableProps<TData>, prevState: ITableProps<TData>) => void>;
export type ControlledPropsKeys = (keyof ITableProps)[];
export type Field = string;
export type FormatFunc<TData = unknown> = Bivariant<(props: { value: unknown, column: Column<TData>, rowData?: TData; }) => React.ReactNode>;
export type FilterFunc<TData = unknown> = Bivariant<(props: { column: Column<TData> }) => Bivariant<(value: unknown, filterRowValue: unknown, rowData?: TData) => boolean> | void>;
export type SortFunc = (props: { column: Column }) => Bivariant<(value1: unknown, value2: unknown) => 0 | 1 | -1> | void;
export type SearchFunc<TData = unknown> = Bivariant<(props: { searchText: string, rowData: TData, column: Column<TData> }) => boolean | void>;
export type ValidationFunc<TData = unknown> = Bivariant<(props: { value: unknown, rowData: TData, column: Column<TData> }) => string | void>;
