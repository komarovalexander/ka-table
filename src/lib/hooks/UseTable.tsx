import * as actionCreators from '../actionCreators';

import { ITableInstance, ITableProps } from '../Components/Table/Table';

import { OnDispatchFunc } from '../types';

export const getTable = (options?: {
  changeProps?: React.Dispatch<React.SetStateAction<ITableProps>>;
  onDispatch?: OnDispatchFunc;
}): ITableInstance => {
  const { changeProps, onDispatch } = options || {};
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
  };
};

export const useTable = (options?: {
  changeProps?: React.Dispatch<React.SetStateAction<ITableProps>>;
  onDispatch?: OnDispatchFunc;
}): ITableInstance => {
  return getTable(options);
};
