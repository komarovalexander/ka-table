import * as actionCreators from '../actionCreators';

import { CustomReducerFunc, OnDispatchFunc } from '../types';
import { ITableInstance, ITableProps } from '../Components/Table/Table';

export const getTable = (options?: {
    changeProps?: React.Dispatch<React.SetStateAction<ITableProps>>;
    onDispatch?: OnDispatchFunc;
    customReducer?: CustomReducerFunc;
}): ITableInstance => {
    const { changeProps, onDispatch, customReducer } = options || {};
    const propsResult = {} as any;
    return {
        ...(Object.keys(actionCreators).reduce((acc, key) => {
            acc[key] = function (...args: any) {
                this.dispatch((actionCreators as any)[key](...args));
            };
            return acc;
        }, {} as any) as typeof actionCreators),
        props: propsResult,
        changeProps: changeProps || (() => {}),
        dispatch: () => {},
        onDispatch: onDispatch || ((() => {}) as OnDispatchFunc),
        customReducer
    };
};

export const useTable = (options?: { onDispatch?: OnDispatchFunc;
                                     customReducer?: CustomReducerFunc; }): ITableInstance => {
    return getTable(options);
};
