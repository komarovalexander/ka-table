import * as React from 'react';

import { ActionType, EditingMode } from '../enums';
import { ICellProps, IGroupRowProps } from '../props';
import { getGroupKeyId, isGroupRow, isGroupSummaryRow } from '../Utils/GroupUtils';
import { getNextColumnKey, getNextRowKeyValue } from '../Utils/NavigationUtils';
import { openEditor, setFocused, updateGroupsExpanded, updatePageIndex, updateTreeGroupsExpanded } from '../actionCreators';

import { Cell } from '../Models/Cell';
import { ITableAllProps } from '../Components/Table/Table';
import { ITableData } from './UseTableData';
import { getPageData } from '../Utils/PagingUtils';
import { getRowKeyValue } from '../Utils/RowUtils';
import { isTreeGroupRow } from '../Utils/TreeUtils';
import { getScrollLeftToColumn, isHorizontalVirtualScrollingEnabled, isVirtualScrollingEnabled } from '../Utils/Virtualize';
import { useIsomorphicLayoutEffect } from '../Utils/EffectUtils';
import { focusCell } from '../Utils/FocusUtils';

export interface IKeyboardNavigation {
    // the cells of the table by their elements: the keys pressed on them are handled by the table
    cells: WeakMap<Element, Cell>;
    // the cells of the group rows by their elements: the keys of their groups
    groups: WeakMap<Element, unknown[]>;
    // set by a key: the cell which becomes focused takes the focus of the browser
    focusRequestRef: { current: boolean };
    // the column of the last focused cell: the focus returns to it from a group row
    columnKeyRef: { current?: string };
}

// a row which gets the focus: a row with cells by its key or a group row by the key of its group
interface INavigationRow {
    groupKey?: unknown[];
    rowKeyValue?: unknown;
}

// the rows of the page which get the focus: the group summary rows are skipped
const getNavigationRows = (data: unknown[], rowKeyField: string): INavigationRow[] => data
    .filter((row) => !isGroupSummaryRow(row))
    .map((row) => (isGroupRow(row) ? { groupKey: row.key } : { rowKeyValue: getRowKeyValue(row, rowKeyField) }));

const isSameGroup = (groupKey: unknown[], otherGroupKey: unknown[]) => getGroupKeyId(groupKey) === getGroupKeyId(otherGroupKey);

export const KeyboardNavigationContext = React.createContext<IKeyboardNavigation | undefined>(undefined);

const isSameCell = (cell: Cell, otherCell: Cell) => cell.columnKey === otherCell.columnKey && cell.rowKeyValue === otherCell.rowKeyValue;

const isFocusLost = () => !document.activeElement || document.activeElement === document.body;

// the keyboard navigation is turned off by keyboardNavigation: false
export const isKeyboardNavigationEnabled = (props: { keyboardNavigation?: boolean }) => props.keyboardNavigation !== false;

/**
 * Handles the keys pressed on the cells of the table (keyboardNavigation): the focus moves to another cell,
 * the page changes, the editor opens
 */
export const useTableKeyboardNavigation = (props: ITableAllProps, tableData: ITableData) => {
    const { dispatch, editingMode, groupsExpanded, paging, rowKeyField, treeExpandButtonColumnKey, treeGroupKeyField, virtualScrolling } = props;
    const keyboardNavigation = isKeyboardNavigationEnabled(props);
    const [navigation] = React.useState<IKeyboardNavigation>(() => ({
        cells: new WeakMap(),
        groups: new WeakMap(),
        focusRequestRef: { current: false },
        columnKeyRef: {},
    }));
    const navigationRows = React.useMemo(
        () => keyboardNavigation ? getNavigationRows(tableData.groupedData, rowKeyField) : [],
        [keyboardNavigation, tableData.groupedData, rowKeyField]
    );
    const rowKeyValues = React.useMemo(() => navigationRows.filter((row) => !row.groupKey).map((row) => row.rowKeyValue), [navigationRows]);
    if (!keyboardNavigation) {
        return {};
    }
    const { columns } = tableData;
    // the column of a row with cells which gets the focus: the column of the last focused cell or the first one
    const getColumnKey = (columnKey?: string) => (columns.some((c) => c.key === columnKey) ? columnKey! : columns[0]?.key);

    // the virtual scrolling renders only the visible rows and columns: the row and the column are scrolled to, so the cell is rendered
    const scrollToRow = (navigationRow: INavigationRow, columnKey?: string) => {
        if (!isVirtualScrollingEnabled(virtualScrolling)) {
            return;
        }
        const { itemHeight, scrollTop = 0, tbodyHeight = 600 } = virtualScrolling!;
        const getRowHeight = (row: unknown) => (typeof itemHeight === 'function' ? itemHeight(row) : itemHeight) || 40;
        const rowIndex = tableData.groupedData.findIndex((row) => (navigationRow.groupKey
            ? isGroupRow(row) && isSameGroup(row.key, navigationRow.groupKey)
            : !isGroupRow(row) && getRowKeyValue(row, rowKeyField) === navigationRow.rowKeyValue));
        const rowTop = tableData.groupedData.slice(0, rowIndex).reduce<number>((top, row) => top + getRowHeight(row), 0);
        const rowHeight = getRowHeight(tableData.groupedData[rowIndex]);
        const isRowHidden = rowTop < scrollTop || rowTop + rowHeight > scrollTop + tbodyHeight;
        // virtualScrolling.horizontal, which renders all the columns with the grouped columns of the header
        const scrollLeft = columnKey !== undefined && isHorizontalVirtualScrollingEnabled(virtualScrolling) && !props.groupedColumns?.length
            ? getScrollLeftToColumn(columns, columnKey, virtualScrolling!)
            : undefined;
        if (isRowHidden || scrollLeft !== undefined) {
            dispatch({
                type: ActionType.ScrollTable,
                scrollTop: !isRowHidden ? scrollTop : rowTop < scrollTop ? rowTop : rowTop + rowHeight - tbodyHeight,
                ...(scrollLeft !== undefined && { scrollLeft }),
            });
        }
    };

    const openCellEditor = (cell: Cell) => {
        const column = columns.find((c) => c.key === cell.columnKey);
        if (editingMode === EditingMode.Cell && column && column.isEditable !== false) {
            dispatch(openEditor(cell.rowKeyValue, cell.columnKey));
        }
    };

    // the cell with the arrow of a tree row which has children: Enter and Space expand and collapse the row
    const treeColumnKey = treeExpandButtonColumnKey || columns[0]?.key;
    const isTreeArrowCell = (cell: Cell) => !!treeGroupKeyField && cell.columnKey === treeColumnKey
        && tableData.groupedData.some((row) => isTreeGroupRow(row) && getRowKeyValue(row, rowKeyField) === cell.rowKeyValue);

    const isGroupExpanded = (groupKey: unknown[]) => !groupsExpanded || groupsExpanded.some((key) => isSameGroup(key, groupKey));

    // the row above or below, or the first or the last row (end): the group rows get the focus too
    const getNextRow = (row: INavigationRow, step: 1 | -1, end: boolean): INavigationRow | undefined => {
        if (end) {
            return step > 0 ? navigationRows[navigationRows.length - 1] : navigationRows[0];
        }
        const index = navigationRows.findIndex((navigationRow) => (row.groupKey
            ? !!navigationRow.groupKey && isSameGroup(navigationRow.groupKey, row.groupKey)
            : !navigationRow.groupKey && navigationRow.rowKeyValue === row.rowKeyValue));
        // a row which is not shown: the focus goes forward to the first row and stays back
        if (index === -1) {
            return step > 0 ? navigationRows[0] : undefined;
        }
        return navigationRows[index + step];
    };

    const isSameRow = (row: INavigationRow, otherRow: INavigationRow) => (row.groupKey
        ? !!otherRow.groupKey && isSameGroup(row.groupKey, otherRow.groupKey)
        : !otherRow.groupKey && row.rowKeyValue === otherRow.rowKeyValue);

    // the focus moves to a group row or to the cell of the column of the last focused cell
    const focusRow = (row: INavigationRow) => {
        navigation.focusRequestRef.current = true;
        const columnKey = getColumnKey(navigation.columnKeyRef.current);
        dispatch(setFocused(row.groupKey
            ? { group: row.groupKey }
            : { cell: { columnKey, rowKeyValue: row.rowKeyValue } }));
        scrollToRow(row, row.groupKey ? undefined : columnKey);
    };

    const moveVertically = (row: INavigationRow, event: React.KeyboardEvent) => {
        event.preventDefault();
        const nextRow = getNextRow(row, event.key === 'ArrowDown' ? 1 : -1, event.ctrlKey || event.metaKey);
        if (nextRow && !isSameRow(nextRow, row)) {
            focusRow(nextRow);
        }
    };

    const getTargetCell = (event: React.KeyboardEvent, cell: Cell): Cell | undefined => {
        const end = event.ctrlKey || event.metaKey;
        switch (event.key) {
        case 'ArrowRight':
        case 'ArrowLeft':
            return { ...cell, columnKey: getNextColumnKey(columns, cell.columnKey, event.key === 'ArrowRight' ? 1 : -1, end) };
        case 'Home':
        case 'End': {
            const step = event.key === 'End' ? 1 : -1;
            return {
                columnKey: getNextColumnKey(columns, cell.columnKey, step, true),
                rowKeyValue: end ? getNextRowKeyValue(rowKeyValues, cell.rowKeyValue, step, true) : cell.rowKeyValue,
            };
        }
        }
        return undefined;
    };

    // the first row of another page gets the focus, a cell in the column of the last focused cell
    const goToPage = (step: 1 | -1) => {
        const pageIndex = (paging?.pageIndex || 0) + step;
        if (pageIndex < 0 || pageIndex >= tableData.pagesCount) {
            return;
        }
        // the rows of the page are loaded with remote paging: the first cell of the page gets the focus
        const pageRows = paging?.pagesCount ? [] : getNavigationRows(getPageData(tableData.dataWithoutPaging, { ...paging, pageIndex }), rowKeyField);
        navigation.focusRequestRef.current = true;
        dispatch(updatePageIndex(pageIndex));
        if (isVirtualScrollingEnabled(virtualScrolling)) {
            dispatch({ type: ActionType.ScrollTable, scrollTop: 0 });
        }
        if (pageRows.length) {
            dispatch(setFocused(pageRows[0].groupKey
                ? { group: pageRows[0].groupKey }
                : { cell: { columnKey: getColumnKey(navigation.columnKeyRef.current), rowKeyValue: pageRows[0].rowKeyValue } }));
        }
    };

    // a group row: the arrows Up and Down move the focus, Left and Right collapse and expand the group,
    // Space (on keyup with Enter) toggles it, Home and End with Ctrl go to the first and the last row, PageUp and PageDown change the page
    const onGroupKeyDown = (event: React.KeyboardEvent<HTMLElement>, groupKey: unknown[]) => {
        switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
            moveVertically({ groupKey }, event);
            return;
        case 'Home':
        case 'End': {
            // the row has one cell: Home and End without Ctrl keep the focus in it
            event.preventDefault();
            const endRow = (event.ctrlKey || event.metaKey) && getNextRow({ groupKey }, event.key === 'End' ? 1 : -1, true);
            if (endRow && !isSameRow(endRow, { groupKey })) {
                focusRow(endRow);
            }
            return;
        }
        case 'ArrowLeft':
        case 'ArrowRight':
            event.preventDefault();
            if (isGroupExpanded(groupKey) !== (event.key === 'ArrowRight')) {
                dispatch(updateGroupsExpanded(groupKey));
            }
            return;
        case ' ':
            // the page is not scrolled
            event.preventDefault();
            return;
        case 'PageDown':
        case 'PageUp':
            if (paging?.enabled) {
                event.preventDefault();
                goToPage(event.key === 'PageDown' ? 1 : -1);
            }
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        // keys pressed in an editor or another element inside a cell are not handled
        const groupKey = navigation.groups.get(event.target as Element);
        if (groupKey) {
            onGroupKeyDown(event, groupKey);
            return;
        }
        const cell = navigation.cells.get(event.target as Element);
        if (!cell) {
            return;
        }
        navigation.columnKeyRef.current = cell.columnKey;
        if (event.key === 'F2') {
            event.preventDefault();
            openCellEditor(cell);
            return;
        }
        if ((event.key === 'PageDown' || event.key === 'PageUp') && paging?.enabled) {
            event.preventDefault();
            goToPage(event.key === 'PageDown' ? 1 : -1);
            return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            moveVertically({ rowKeyValue: cell.rowKeyValue }, event);
            return;
        }
        if (event.key === ' ' && isTreeArrowCell(cell)) {
            // the page is not scrolled, the row is toggled on keyup
            event.preventDefault();
            return;
        }
        const targetCell = getTargetCell(event, cell);
        if (!targetCell) {
            return;
        }
        event.preventDefault();
        if (!isSameCell(targetCell, cell)) {
            navigation.focusRequestRef.current = true;
            navigation.columnKeyRef.current = targetCell.columnKey;
            dispatch(setFocused({ cell: targetCell }));
            scrollToRow({ rowKeyValue: targetCell.rowKeyValue }, targetCell.columnKey);
        }
    };

    // Enter opens the editor on keyup, as the editors handle Enter on keyup too,
    // and the keyup which opens the editor doesn't go further to the handlers of the page.
    // Enter and Space toggle a group row and a tree row on the cell of its arrow (F2 opens the editor of this cell)
    const onKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
        const groupKey = navigation.groups.get(event.target as Element);
        if (groupKey) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation();
                dispatch(updateGroupsExpanded(groupKey));
            }
            return;
        }
        const cell = navigation.cells.get(event.target as Element);
        if (!cell) {
            return;
        }
        if ((event.key === 'Enter' || event.key === ' ') && isTreeArrowCell(cell)) {
            event.stopPropagation();
            dispatch(updateTreeGroupsExpanded(cell.rowKeyValue));
        } else if (event.key === 'Enter') {
            event.stopPropagation();
            openCellEditor(cell);
        }
    };

    return { navigation, onKeyDown, onKeyUp };
};

/**
 * The attributes of the cell element for the keyboard navigation, undefined when it is turned off:
 * only the focused cell gets the focus by Tab, the focus moves to the cell which becomes focused by a key
 * or returns to the cell from its closed editor
 */
export const useCellKeyboardNavigation = (props: ICellProps) => {
    const navigation = React.useContext(KeyboardNavigationContext);
    const { column, dispatch, isEditableCell, isFocused, rowKeyValue } = props;
    const elementRef = React.useRef<HTMLTableCellElement | null>(null);
    const isEditableCellRef = React.useRef(isEditableCell);

    useIsomorphicLayoutEffect(() => {
        const isEditorClosed = isEditableCellRef.current && !isEditableCell;
        isEditableCellRef.current = isEditableCell;
        const element = elementRef.current;
        if (!navigation || !element) {
            return;
        }
        navigation.cells.set(element, { columnKey: column.key, rowKeyValue });
        if (isFocused && (navigation.focusRequestRef.current || (isEditorClosed && isFocusLost()))) {
            navigation.focusRequestRef.current = false;
            focusCell(element);
        }
    }, [navigation, isFocused, isEditableCell, column.key, rowKeyValue]);

    useIsomorphicLayoutEffect(() => {
        const element = elementRef.current;
        return () => {
            // the cell is removed with the focus in its editor (e.g. its row gets the key typed in the editor):
            // the focus goes to the focused cell of the updated table, as from a closed editor
            if (navigation && element && isEditableCellRef.current && element.contains(document.activeElement)) {
                const table = element.closest('table');
                queueMicrotask(() => {
                    if (isFocusLost()) {
                        table?.querySelector<HTMLElement>('tbody td[tabindex="0"]')?.focus();
                    }
                });
            }
        };
    }, [navigation]);

    if (!navigation) {
        return undefined;
    }
    return {
        elementRef,
        tabIndex: isFocused ? 0 : -1,
        // a click or Tab focuses the cell (or an element inside it): the cell becomes focused
        onFocus: () => {
            if (!isFocused) {
                dispatch(setFocused({ cell: { columnKey: column.key, rowKeyValue } }));
            }
        },
    };
};

/**
 * The attributes of the cell of a group row for the keyboard navigation, undefined when it is turned off:
 * the group row gets the focus by the arrows Up and Down as the rows with cells, its keys expand and collapse it
 */
export const useGroupKeyboardNavigation = (props: IGroupRowProps) => {
    const navigation = React.useContext(KeyboardNavigationContext);
    const { dispatch, groupKey, isFocused } = props;
    const elementRef = React.useRef<HTMLTableCellElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        const element = elementRef.current;
        if (!navigation || !element) {
            return;
        }
        navigation.groups.set(element, groupKey);
        if (isFocused && navigation.focusRequestRef.current) {
            navigation.focusRequestRef.current = false;
            focusCell(element);
        }
    }, [navigation, isFocused, groupKey]);

    if (!navigation) {
        return undefined;
    }
    return {
        elementRef,
        tabIndex: isFocused ? 0 : -1,
        // a click or Tab focuses the group row
        onFocus: () => {
            if (!isFocused) {
                dispatch(setFocused({ group: groupKey }));
            }
        },
    };
};
