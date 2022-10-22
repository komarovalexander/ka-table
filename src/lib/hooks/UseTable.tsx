import { ITableProps } from '../Components/Table/Table';
import { ITableInstance } from '../Components/TableUncontrolled/TableUncontrolled';
import { DispatchFunc } from '../types';

export const useTable = (options?: {
  props?: ITableProps;
  changeProps?: React.Dispatch<React.SetStateAction<ITableProps>>;
  onDispatch?: DispatchFunc;
}): ITableInstance => {
  const {
    props,
    changeProps,
    onDispatch
  } = options || {};
  const propsResult =  props || ({} as any);
  return {
    props: propsResult,
    changeProps: changeProps || (() => {}),
    onDispatch: onDispatch || (() => {}) as DispatchFunc
  };
}
