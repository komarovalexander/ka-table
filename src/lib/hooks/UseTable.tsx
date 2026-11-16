import { Dispatch, SetStateAction, useInsertionEffect, useState } from 'react';
import * as actionCreators from '../Namespaces/actionCreators';

import { CustomReducerFunc, OnDispatchFunc, TableAction } from '../types';
import { ITableInstance, ITableProps } from '../Components/Table/Table';

const emptyFunc = () => {};

// the action creators by their names: the methods of the instance pass their arguments to them
const actionCreatorFunctions = actionCreators as Record<string, (...args: unknown[]) => TableAction>;

/**
 * Creates a table instance. Use it outside of function components (class components, stores);
 * inside function components use the useTable hook, which keeps the same instance between renders.
 */
export const getTable = <TData = unknown>(options?: {
    changeProps?: Dispatch<SetStateAction<ITableProps<TData>>>;
    onDispatch?: OnDispatchFunc<TData>;
    customReducer?: CustomReducerFunc<TData>;
}): ITableInstance<TData> => {
    const { changeProps, onDispatch, customReducer } = options || {};
    const table: ITableInstance<TData> = {
        // the methods use the table object itself, not `this`, so they can be passed around as callbacks
        ...(Object.fromEntries(Object.keys(actionCreators).map((key): [string, (...args: unknown[]) => void] => [
            key,
            (...args) => table.dispatch(actionCreatorFunctions[key](...args)),
        ])) as Pick<ITableInstance, keyof typeof actionCreators>),
        props: {} as ITableProps<TData>,
        changeProps: changeProps || emptyFunc,
        dispatch: emptyFunc,
        onDispatch: onDispatch || emptyFunc,
        customReducer,
    };
    return table;
};

/**
 * Returns a value to pass to `table` property of the component
 */
export const useTable = <TData = unknown>(options?: {
    onDispatch?: OnDispatchFunc<TData>;
    customReducer?: CustomReducerFunc<TData>;
}): ITableInstance<TData> => {
    const [table] = useState(() => getTable<TData>(options));
    // the instance stays the same, the callbacks are the latest ones of a committed render:
    // React can discard a render, and the actions of the table must not get its callbacks
    const onDispatch = options?.onDispatch || emptyFunc;
    const customReducer = options?.customReducer;
    useInsertionEffect(() => {
        table.onDispatch = onDispatch;
        table.customReducer = customReducer;
    });
    return table;
};
