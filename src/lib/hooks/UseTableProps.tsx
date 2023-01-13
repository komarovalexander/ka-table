import { useContext } from 'react';

import { ITableProps } from '../Components/Table/Table';
import { TablePropsContext } from '../Components/TableControlled/TableControlled';

export const useTableProps = (): ITableProps => {
    const context = useContext(TablePropsContext);
    return context;
}
