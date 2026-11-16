import { ITableInstance } from '../Components/Table/Table';
import { TableInstanceContext } from '../Components/TableUncontrolled/TableUncontrolled';
import { useContext } from 'react';

/**
 * Returns a value which was passed to `table` property of the component, can be used if table is in uncontrolled mode
 */
// TData: the type of the rows of the table which renders the component
export const useTableInstance = <TData = unknown>(): ITableInstance<TData> => {
    const context = useContext(TableInstanceContext);
    if (!context?.changeProps) {
        console.warn(
            'useTableInstance warning: ka-table is not initialized, instanse is empty because: table is not rendered yet OR controlled mode is used'
        );
    }
    return context as ITableInstance<TData>;
};
