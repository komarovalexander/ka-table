import * as React from 'react';

import { getPageData, getPagesCount } from '../Utils/PagingUtils';

import { Column } from '../Models/Column';
import { ITableProps } from '../Components/Table/Table';
import { getData } from '../Utils/PropsUtils';
import { getGroupedAndVisibleColumns } from '../Utils/GroupUtils';

export interface ITableData {
    // visible columns which are not grouped
    columns: Column[];
    groupColumnsCount: number;
    groupedColumns: Column[];
    // the rows of all pages: filtered, sorted, grouped
    dataWithoutPaging: any[];
    // the rows of the current page
    groupedData: any[];
    pagesCount: number;
}

export const TableDataContext = React.createContext<ITableData | undefined>(undefined);

// all the props which getData uses, except paging
const getDataDependencies = (props: ITableProps) => [
    props.columns,
    props.data,
    props.extendedFilter,
    props.extendedSort,
    props.filter,
    props.format,
    props.groups,
    props.groupsExpanded,
    props.rowKeyField,
    props.search,
    props.searchText,
    props.sort,
    props.sortingMode,
    props.treeGroupKeyField,
    props.treeGroupsExpanded,
];

/**
 * Filtering, sorting and grouping are calculated again only when the props they use change,
 * so selecting, editing or scrolling doesn't process the data again; a page change only slices it.
 */
export const useTableDataCalculation = (props: ITableProps, enabled: boolean = true): ITableData | undefined => {
    const { columns, groups, paging } = props;
    const dataWithoutPaging = React.useMemo(
        () => enabled ? getData({ ...props, paging: undefined }) : undefined,
        [enabled, ...getDataDependencies(props)]
    );
    const groupedData = React.useMemo(() => dataWithoutPaging && getPageData(dataWithoutPaging, paging), [dataWithoutPaging, paging]);
    const pagesCount = React.useMemo(() => dataWithoutPaging ? getPagesCount(dataWithoutPaging, paging) : 1, [dataWithoutPaging, paging]);
    const preparedColumns = React.useMemo(() => getGroupedAndVisibleColumns(columns, groups), [columns, groups]);
    return React.useMemo(
        () => groupedData && { ...preparedColumns, dataWithoutPaging: dataWithoutPaging!, groupedData, pagesCount },
        [dataWithoutPaging, groupedData, pagesCount, preparedColumns]
    );
};

/**
 * Returns the data calculated by the table (TableControlled), or calculates it if the component is used separately.
 */
export const useTableData = (props: ITableProps): ITableData => {
    const tableData = React.useContext(TableDataContext);
    const ownTableData = useTableDataCalculation(props, !tableData);
    return (tableData || ownTableData)!;
};
