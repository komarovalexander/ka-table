import { ChildAttributesItem, DispatchFunc, DraggableKind } from '../types';
import { getPageData, getPagesCount } from './PagingUtils';
import { isRemoteSorting, sortColumns, sortData } from './SortUtils';

import { AllHTMLAttributes } from 'react';
import { ChildComponent } from '../Models/ChildComponent';
import { Column } from '../models';
import { ITableProps } from '../';
import { SortingMode } from '../enums';
import defaultOptions from '../defaultOptions';
import { filterAndSearchData } from './FilterUtils';
import { getEnabledGroups, getGroupedAndVisibleColumns, getGroupedData } from './GroupUtils';
import { getTreeData, restoreFilteredData } from './TreeUtils';
import { getRowKeyValues } from './RowUtils';
import { getValidatedEditableCells } from './ReducerUtils';
import { getValueByField } from './DataUtils';
import { groupColumn } from '../actionCreators';

export function extendProps<T = HTMLElement>(
    childElementAttributes: AllHTMLAttributes<T>,
    childProps: any,
    childComponent?: ChildComponent<any>): React.AllHTMLAttributes<T> {
    let resultProps = childElementAttributes;
    const childCustomAttributes = childComponent && childComponent.elementAttributes && childComponent.elementAttributes(childProps);
    if (childCustomAttributes) {
        const dispatch: DispatchFunc = childProps.dispatch;
        resultProps = mergeProps(childElementAttributes, childProps, childCustomAttributes, dispatch);
    }
    return resultProps;
};

const emptyFunc = () => { };
export function mergeProps<T = HTMLElement>(
    childElementAttributes: AllHTMLAttributes<T>,
    childProps: any,
    childCustomAttributes: ChildAttributesItem<any>,
    dispatch: DispatchFunc): React.AllHTMLAttributes<T> {
    const customPropsWithEvents: any = {};
    for (const prop in childCustomAttributes) {
        if (Object.prototype.hasOwnProperty.call(childCustomAttributes, prop)) {
            const propName = prop as string;
            const propValue: any = (childCustomAttributes as any)[propName];
            const baseFunc = (childElementAttributes as any)[propName] || emptyFunc;
            if (typeof propValue === 'function') {
                customPropsWithEvents[prop] = (e: any) => {
                    propValue(e, {
                        baseFunc,
                        childElementAttributes,
                        childProps,
                        dispatch,
                    });
                };
            }
        }
    }

    const mergedResult: React.AllHTMLAttributes<T> = {
        ...childElementAttributes,
        ...childCustomAttributes,
        ...customPropsWithEvents,
        className: `${childElementAttributes.className || ''} ${childCustomAttributes.className || ''}`,
        style: { ...childElementAttributes.style, ...childCustomAttributes.style }
    };

    return mergedResult;
};

export const getFilteredData = (props: ITableProps) => {
    return filterAndSearchData(props);
}

// false without rows (e.g. nothing is found), so the checkbox of all the rows is not checked
const areAllRowsSelected = (rowKeyValues: unknown[], selectedRows: unknown[] = []) => {
    const selectedRowsSet = new Set(selectedRows);
    return rowKeyValues.length > 0 && rowKeyValues.every((rowKeyValue) => selectedRowsSet.has(rowKeyValue));
};

export const areAllFilteredRowsSelected = (props: ITableProps) => (
    areAllRowsSelected(filterAndSearchData(props).map((d) => getValueByField(d, props.rowKeyField)), props.selectedRows)
);

export const areAllVisibleRowsSelected = (props: ITableProps) => (
    areAllRowsSelected(getRowKeyValues(getData(props), props.rowKeyField), props.selectedRows)
);

const getDataWithoutPaging =  (props: ITableProps) => {
    const {
        columns,
        groupsExpanded,
        treeGroupKeyField,
        treeGroupsExpanded,
        extendedSort,
        rowKeyField,
        sort,
        sortingMode = SortingMode.None
    } = props;
    const {
        data = [],
    } = props;
    const groups = getEnabledGroups(props.groups);
    let resultData = filterAndSearchData(props);
    if (treeGroupKeyField && resultData.length !== data.length) {
        // the parents of the found rows are sorted together with them
        resultData = restoreFilteredData({ data: resultData, originalData: data, rowKeyField, treeGroupKeyField });
    }
    if (!isRemoteSorting(sortingMode)) {
        resultData = sortData(columns, resultData, sort);
    }
    resultData = extendedSort ? extendedSort(resultData, columns) : resultData;

    const groupedColumns: Column[] = groups ? columns.filter((c) => groups.some((g) => g.columnKey === c.key)) : [];
    resultData = groups ? getGroupedData(resultData, groups, groupedColumns, groupsExpanded) : resultData;
    resultData = treeGroupKeyField ? getTreeData({ data: resultData, rowKeyField, treeGroupKeyField, treeGroupsExpanded, originalData: resultData }) : resultData;

    return resultData;
};

export const getData = (props: ITableProps) => {
    const {
        paging
    } = props;
    let resultData = getDataWithoutPaging(props);
    resultData = getPageData(resultData, paging);

    return resultData;
};

export const isValid = (props: ITableProps) => {
    return (
        !props.validation || !getValidatedEditableCells(props).some(cell => cell.validationMessage)
    );
};

export const getSelectedData = ({ data, selectedRows, rowKeyField }: ITableProps) => {
    const selectedRowsSet = new Set(selectedRows);
    return data ? data.filter(d => selectedRowsSet.has(getValueByField(d, rowKeyField))) : [];
};

export const getSortedColumns = (props: ITableProps): Column[] => {
    return sortColumns(props.columns);
};

export const getPagesCountByProps = (props: ITableProps) => {
    const {
        paging,
    } = props;
    let pagesCount = 1;
    if (paging && paging.enabled) {
        const data = getDataWithoutPaging(props);
        pagesCount = getPagesCount(data, paging);
    }
    return pagesCount;
};

export const prepareTableOptions = (props: ITableProps) => {
    return {
        ...getGroupedAndVisibleColumns(props.columns, props.groups),
        groupedData: getData(props),
    };
};

const draggableDataType = 'ka-draggableKeyValue';

interface DraggedItem {
    key: unknown;
    kind?: DraggableKind;
    table: Element | null;
}
// the item which is dragged now by a table: rows and columns of all the tables use the same type of the data
let draggedItem: DraggedItem | undefined;

const getTableElement = (element: Element): Element | null => element.closest?.(`.${defaultOptions.css.root}`) || null;

// the dragged item if it is of the kind and from the table of the element
const getDraggedItem = (event: React.DragEvent, kind?: DraggableKind): DraggedItem | undefined => (
    draggedItem
    && draggedItem.kind === kind
    // the item dragged by a table, not a file or a text which is dragged after that
    && Array.from(event.dataTransfer?.types || []).some((type) => type.toLowerCase() === draggableDataType.toLowerCase())
    && draggedItem.table === getTableElement(event.currentTarget)
        ? draggedItem
        : undefined
);

/**
 * Checks that the dragged item is of the kind (rows or columns) and from the table of the element,
 * so a row dropped on a header cell or on the group panel, or an item of another table, changes nothing.
 */
export const isDraggedItemOfKind = (event: React.DragEvent, kind?: DraggableKind): boolean => !!getDraggedItem(event, kind);

export const groupPanelOnDrop = (event: React.DragEvent, dispatch: DispatchFunc) => {
    const columnKey = getDraggedItem(event, 'column')?.key;
    // the keys of the columns are strings
    if (typeof columnKey === 'string') {
        dispatch(groupColumn(columnKey));
    }
};

export const getDraggableProps = ({
    key,
    dispatch,
    actionCreator,
    draggedClass,
    dragOverClass,
    hasReordering,
    kind,
}: {
    key: any,
    dispatch: DispatchFunc,
    actionCreator: (draggableKeyValue: any, targetKeyValue: any) => any,
    draggedClass: string,
    dragOverClass: string,
    hasReordering: boolean,
    // the items are dropped only on the items of the same kind, the items without a kind on the items without a kind
    kind?: DraggableKind,
}): ChildAttributesItem<any> => {
    let count: number = 0;
    const reorderingProps: ChildAttributesItem<any> = hasReordering ? {
        onDragEnter: (event) => {
            if (!isDraggedItemOfKind(event, kind)) {
                return;
            }
            count++;
            if (!event.currentTarget.classList.contains(dragOverClass)) {
                event.currentTarget.classList.add(dragOverClass);
            }
            event.preventDefault();
        },
        onDragLeave: (event) => {
            if (!isDraggedItemOfKind(event, kind)) {
                return;
            }
            count--;
            if (count === 0) {
                event.currentTarget.classList.remove(dragOverClass);
            }
        },
        onDragOver: (event) => {
            if (!isDraggedItemOfKind(event, kind)) {
                return;
            }
            if (!event.currentTarget.classList.contains(dragOverClass)) {
                event.currentTarget.classList.add(dragOverClass);
            }
            event.preventDefault();
        }
    } : {};
    return {
        draggable: true,
        onDragStart: (event) => {
            count = 0;
            draggedItem = { key, kind, table: getTableElement(event.currentTarget) };
            event.dataTransfer.setData(draggableDataType, JSON.stringify(key));
            event.currentTarget.classList.add(draggedClass);
            event.dataTransfer.effectAllowed = 'move';
        },
        onDragEnd: (event) => {
            event.currentTarget.classList.remove(draggedClass);
            draggedItem = undefined;
        },
        onDrop: (event) => {
            // dragleave doesn't follow the drop
            count = 0;
            event.currentTarget.classList.remove(dragOverClass);
            const item = getDraggedItem(event, kind);
            if (hasReordering && item) {
                dispatch(actionCreator(item.key, key));
            }
        },
        ...reorderingProps
    };
}

