import * as actionCreators from '../actionCreators';
import { ITableInstance, ITableProps } from '../Components/Table/Table';
import { DispatchFunc } from '../types';

export const useTable = (options?: {
  changeProps?: React.Dispatch<React.SetStateAction<ITableProps>>;
  onDispatch?: DispatchFunc;
}): ITableInstance => {
  const {
    changeProps,
    onDispatch
  } = options || {};
  const propsResult = ({} as any);
  return {
    ...Object.keys(actionCreators).reduce((acc, key) => {
      acc[key]= function(...args: any) { this.dispatch((actionCreators as any)[key](...args)) };
      return acc;
    }, {} as any) as typeof actionCreators,
    props: propsResult,
    changeProps: changeProps || (() => {}),
    onDispatch: onDispatch || (() => {}) as DispatchFunc
  };
}
