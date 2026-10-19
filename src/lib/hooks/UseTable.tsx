import * as React from 'react';
import * as actionCreators from '../actionCreators';

import { CustomReducerFunc, OnDispatchFunc } from '../types';
import { ITableInstance, ITableProps } from '../Components/Table/Table';

const emptyFunc = () => {};

/**
 * Creates a table instance. Use it outside of function components (class components, stores);
 * inside function components use the useTable hook, which keeps the same instance between renders.
 */
export const getTable = (options?: {
    changeProps?: React.Dispatch<React.SetStateAction<ITableProps>>;
    onDispatch?: OnDispatchFunc;
    customReducer?: CustomReducerFunc;
}): ITableInstance => {
    const { changeProps, onDispatch, customReducer } = options || {};
    const table: ITableInstance = {
        // the methods use the table object itself, not `this`, so they can be passed around as callbacks
        ...(Object.keys(actionCreators).reduce((acc, key) => {
            acc[key] = (...args: any[]) => table.dispatch((actionCreators as any)[key](...args));
            return acc;
        }, {} as any) as typeof actionCreators),
        props: {} as ITableProps,
        changeProps: changeProps || emptyFunc,
        dispatch: emptyFunc,
        onDispatch: onDispatch || emptyFunc,
        customReducer,
    };
    return table;
};

export const useTable = (options?: { onDispatch?: OnDispatchFunc;
                                     customReducer?: CustomReducerFunc; }): ITableInstance => {
    const [table] = React.useState(() => getTable(options));
    // the instance stays the same, the callbacks are always the latest ones
    table.onDispatch = options?.onDispatch || emptyFunc;
    table.customReducer = options?.customReducer;
    return table;
};
