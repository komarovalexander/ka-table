import { useContext } from 'react';

import { ITableInstance } from '../Components/Table/Table';
import { TableInstanceContext } from '../Components/TableUncontrolled/TableUncontrolled';

export const useTableInstance = (): ITableInstance => {
    const context = useContext(TableInstanceContext);
    return context;
}
