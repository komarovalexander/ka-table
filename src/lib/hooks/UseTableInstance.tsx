import { ITableInstance } from '../Components/Table/Table';
import { TableInstanceContext } from '../Components/TableUncontrolled/TableUncontrolled';
import { useContext } from 'react';

export const useTableInstance = (): ITableInstance => {
  const context = useContext(TableInstanceContext);
  if (!context?.changeProps) {
    // tslint:disable-next-line:no-console
    console.warn(
      'useTableInstance warning: ka-table is not initialized, instanse is empty because: table is not rendered yet OR controlled mode is used'
    );
  }
  return context;
};
