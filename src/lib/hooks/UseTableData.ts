import * as React from 'react';

import { getPageData, getPagesCount } from '../Utils/PagingUtils';

import { Column } from '../Models/Column';
import { ITableProps } from '../Components/Table/Table';
import { areColumnsSameForRows } from '../Utils/ColumnUtils';
import { getData } from '../Utils/PropsUtils';
import { getGroupedAndVisibleColumns } from '../Utils/GroupUtils';

export interface ITableData {
    // visible columns which are not grouped
    columns: Column[];
    groupColumnsCount: number;
    groupedColumns: Column[];
    // the rows of all pages: filtered, sorted, grouped
    dataWithoutPaging: unknown[];
    // the rows of the current page
    groupedData: unknown[];
    pagesCount: number;
}

export const TableDataContext = React.createContext<ITableData | undefined>(undefined);

// all the props which getData uses, except paging; columnsForRows: the columns which change when the rows change
const getDataDependencies = (props: ITableProps, columnsForRows: Column[]) => [
    columnsForRows,
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

// the columns of the last calculation while the columns change only the way they are shown (their widths, the header filter popup)
const useColumnsForRows = (columns: Column[]): Column[] => {
    const columnsRef = React.useRef(columns);
    if (columnsRef.current !== columns && !areColumnsSameForRows(columnsRef.current, columns, true)) {
        columnsRef.current = columns;
    }
    return columnsRef.current;
};

/**
 * Filtering, sorting and grouping are calculated again only when the props they use change,
 * so selecting, editing, scrolling, resizing a column or opening its header filter doesn't process the data again;
 * a page change only slices it.
 */
export const useTableDataCalculation = (props: ITableProps, enabled: boolean = true): ITableData | undefined => {
    const { columns, groups, paging } = props;
    const columnsForRows = useColumnsForRows(columns);
    const dataWithoutPaging = React.useMemo(
        () => enabled ? getData({ ...props, paging: undefined }) : undefined,
        // eslint-disable-next-line react-hooks/exhaustive-deps -- the props which getData uses
        [enabled, ...getDataDependencies(props, columnsForRows)]
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
