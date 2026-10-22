import * as React from 'react';

import { ActionType, EditingMode } from '../enums';
import { getNextColumnKey, getNextRowKeyValue, getRowKeyValue, getRowKeyValues } from '../Utils/NavigationUtils';
import { openEditor, setFocused, updatePageIndex } from '../actionCreators';

import { Cell } from '../Models/Cell';
import { ICellProps } from '../props';
import { ITableAllProps } from '../Components/Table/Table';
import { ITableData } from './UseTableData';
import { getPageData } from '../Utils/PagingUtils';
import { isVirtualScrollingEnabled } from '../Utils/Virtualize';
import { useIsomorphicLayoutEffect } from '../Utils/EffectUtils';

export interface IKeyboardNavigation {
    // the cells of the table by their elements: the keys pressed on them are handled by the table
    cells: WeakMap<Element, Cell>;
    // set by a key: the cell which becomes focused takes the focus of the browser
    focusRequestRef: { current: boolean };
}

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
    const { dispatch, editingMode, paging, rowKeyField, virtualScrolling } = props;
    const keyboardNavigation = isKeyboardNavigationEnabled(props);
    const [navigation] = React.useState<IKeyboardNavigation>(() => ({ cells: new WeakMap(), focusRequestRef: { current: false } }));
    const rowKeyValues = React.useMemo(
        () => keyboardNavigation ? getRowKeyValues(tableData.groupedData, rowKeyField) : [],
        [keyboardNavigation, tableData.groupedData, rowKeyField]
    );
    if (!keyboardNavigation) {
        return {};
    }
    const { columns } = tableData;

    // the virtual scrolling renders only the visible rows: the row of the cell is scrolled to, so the cell is rendered
    const scrollToRow = (rowKeyValue: any) => {
        if (!isVirtualScrollingEnabled(virtualScrolling)) {
            return;
        }
        const { itemHeight, scrollTop = 0, tbodyHeight = 600 } = virtualScrolling!;
        const getRowHeight = (row: any) => (typeof itemHeight === 'function' ? itemHeight(row) : itemHeight) || 40;
        const rowIndex = tableData.groupedData.findIndex((row) => getRowKeyValue(row, rowKeyField) === rowKeyValue);
        const rowTop = tableData.groupedData.slice(0, rowIndex).reduce((top, row) => top + getRowHeight(row), 0);
        const rowHeight = getRowHeight(tableData.groupedData[rowIndex]);
        if (rowTop < scrollTop || rowTop + rowHeight > scrollTop + tbodyHeight) {
            dispatch({ type: ActionType.ScrollTable, scrollTop: rowTop < scrollTop ? rowTop : rowTop + rowHeight - tbodyHeight });
        }
    };

    const openCellEditor = (cell: Cell) => {
        const column = columns.find((c) => c.key === cell.columnKey);
        if (editingMode === EditingMode.Cell && column && column.isEditable !== false) {
            dispatch(openEditor(cell.rowKeyValue, cell.columnKey));
        }
    };

    const getTargetCell = (event: React.KeyboardEvent, cell: Cell): Cell | undefined => {
        const end = event.ctrlKey || event.metaKey;
        switch (event.key) {
        case 'ArrowRight':
        case 'ArrowLeft':
            return { ...cell, columnKey: getNextColumnKey(columns, cell.columnKey, event.key === 'ArrowRight' ? 1 : -1, end) };
        case 'ArrowDown':
        case 'ArrowUp':
            return { ...cell, rowKeyValue: getNextRowKeyValue(rowKeyValues, cell.rowKeyValue, event.key === 'ArrowDown' ? 1 : -1, end) };
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

    // a cell of another page gets the focus: the first row of the page with the same column
    const goToPage = (cell: Cell, step: 1 | -1) => {
        const pageIndex = (paging?.pageIndex || 0) + step;
        if (pageIndex < 0 || pageIndex >= tableData.pagesCount) {
            return;
        }
        // the rows of the page are loaded with remote paging: the first cell of the page gets the focus
        const pageRowKeyValues = paging?.pagesCount ? [] : getRowKeyValues(getPageData(tableData.dataWithoutPaging, { ...paging, pageIndex }), rowKeyField);
        navigation.focusRequestRef.current = true;
        dispatch(updatePageIndex(pageIndex));
        if (isVirtualScrollingEnabled(virtualScrolling)) {
            dispatch({ type: ActionType.ScrollTable, scrollTop: 0 });
        }
        if (pageRowKeyValues.length) {
            dispatch(setFocused({ cell: { columnKey: cell.columnKey, rowKeyValue: pageRowKeyValues[0] } }));
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        // keys pressed in an editor or another element inside a cell are not handled
        const cell = navigation.cells.get(event.target as Element);
        if (!cell) {
            return;
        }
        if (event.key === 'F2') {
            event.preventDefault();
            openCellEditor(cell);
            return;
        }
        if ((event.key === 'PageDown' || event.key === 'PageUp') && paging?.enabled) {
            event.preventDefault();
            goToPage(cell, event.key === 'PageDown' ? 1 : -1);
            return;
        }
        const targetCell = getTargetCell(event, cell);
        if (!targetCell) {
            return;
        }
        event.preventDefault();
        if (!isSameCell(targetCell, cell)) {
            navigation.focusRequestRef.current = true;
            dispatch(setFocused({ cell: targetCell }));
            scrollToRow(targetCell.rowKeyValue);
        }
    };

    // Enter opens the editor on keyup, as the editors handle Enter on keyup too,
    // and the keyup which opens the editor doesn't go further to the handlers of the page
    const onKeyUp = (event: React.KeyboardEvent<HTMLElement>) => {
        const cell = navigation.cells.get(event.target as Element);
        if (cell && event.key === 'Enter') {
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
            element.focus();
        }
    }, [navigation, isFocused, isEditableCell, column.key, rowKeyValue]);

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
