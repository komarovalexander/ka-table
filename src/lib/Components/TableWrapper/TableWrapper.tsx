import * as React from 'react';

import { ActionType, EditingMode, FilteringMode, SortingMode } from '../../enums';

import { ChildComponents } from '../../Models/ChildComponents';
import { ColGroup } from '../ColGroup/ColGroup';
import { ColumnIndexesContext } from './ColumnIndexesContext';
import { ColumnResizeContext } from '../HeadCellResize/ColumnResizeContext';
import { ITableAllProps } from '../..';
import TableBody from '../TableBody/TableBody';
import { TableFoot } from '../TableFoot/TableFoot';
import { TableHead } from '../TableHead/TableHead';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getExpandedGroups } from '../../Utils/GroupUtils';
import { getValueByField } from '../../Utils/DataUtils';
import { KeyboardNavigationContext, isKeyboardNavigationEnabled, useTableKeyboardNavigation } from '../../hooks/UseKeyboardNavigation';
import {
    getRenderedColumnsRange, getVirtualizedColumns, isHorizontalVirtualScrollingEnabled, isSameColumnsRange, isVirtualScrollingEnabled,
} from '../../Utils/Virtualize';
import { getColumnsWithFixedStyle } from '../../Utils/ColumnUtils';
import { useIsomorphicLayoutEffect } from '../../Utils/EffectUtils';
import { useTableData } from '../../hooks/UseTableData';

// the same empty values on every render, so memoized children are not re-rendered because of new defaults
const emptyArray: never[] = [];
const emptyChildComponents: ChildComponents = {};

const getAreAllRowsSelected = (data: unknown[], selectedRows: unknown[], rowKeyField: string) => {
    if (!data.length || selectedRows.length < data.length) {
        return false;
    }
    const selectedRowsSet = new Set(selectedRows);
    return data.every((d) => selectedRowsSet.has(getValueByField(d, rowKeyField)));
};

export const TableWrapper: React.FunctionComponent<ITableAllProps> = (props) => {
    const {
        childComponents = emptyChildComponents,
        columnReordering,
        groupPanel,
        columnResizing,
        data = emptyArray,
        dispatch,
        editableCells = emptyArray,
        editingMode = EditingMode.None,
        filteringMode = FilteringMode.None,
        groups,
        rowReordering = false,
        selectedRows = emptyArray,
        sortingMode = SortingMode.None,
        virtualScrolling,
        noData,
        rowKeyField,
    } = props;
    const preparedOptions = useTableData(props);
    // column.fixed: the offsets of the sticky cells
    const columns = React.useMemo(() => getColumnsWithFixedStyle(preparedOptions.columns), [preparedOptions.columns]);
    const hasFixedColumns = React.useMemo(() => columns.some((column) => column.fixed), [columns]);
    // the columns are scrolled under the fixed columns of the edge: these fixed columns show a shadow
    const [overflow, setOverflow] = React.useState({ left: false, right: false });
    const updateOverflow = React.useCallback((element: HTMLElement) => {
        const left = element.scrollLeft > 0;
        const right = element.scrollLeft + element.clientWidth < element.scrollWidth - 1;
        setOverflow((current) => (current.left === left && current.right === right ? current : { left, right }));
    }, []);
    // virtualScrolling.horizontal renders the visible columns only, but all the columns with the grouped columns of the header
    const isHorizontalVirtualScrolling = isHorizontalVirtualScrollingEnabled(virtualScrolling) && !props.groupedColumns?.length;
    const columnsRange = isHorizontalVirtualScrolling ? getRenderedColumnsRange(columns, virtualScrolling!) : undefined;
    const firstColumnIndex = columnsRange?.first ?? 0;
    const lastColumnIndex = columnsRange?.last ?? 0;
    const renderedColumns = React.useMemo(
        () => (isHorizontalVirtualScrolling ? getVirtualizedColumns(columns, { first: firstColumnIndex, last: lastColumnIndex }) : columns),
        [isHorizontalVirtualScrolling, columns, firstColumnIndex, lastColumnIndex]
    );
    // the cells tell their columns (aria-colindex) when not all of them are rendered
    const columnIndexes = React.useMemo(
        () => (isHorizontalVirtualScrolling
            ? new Map(columns.map((column, index) => [column.key, preparedOptions.groupColumnsCount + index + 1]))
            : undefined),
        [isHorizontalVirtualScrolling, columns, preparedOptions.groupColumnsCount]
    );
    // true while a column is resized by the mouse (HeadCellResize): the rows are rendered with the new widths when the resize ends
    const columnResizeRef = React.useRef(false);
    const groupsExpanded = React.useMemo(
        () => groups && !props.groupsExpanded ? getExpandedGroups(preparedOptions.groupedData) : props.groupsExpanded,
        [groups, props.groupsExpanded, preparedOptions.groupedData]
    );

    const areAllRowsSelected = React.useMemo(
        () => getAreAllRowsSelected(data, selectedRows, rowKeyField),
        [data, selectedRows, rowKeyField]
    );

    const keyboardNavigation = useTableKeyboardNavigation(props, preparedOptions);

    const tableWrapper = getElementCustomization<HTMLDivElement>({
        className: defaultOptions.css.tableWrapper,
        onScroll: isVirtualScrollingEnabled(virtualScrolling) || hasFixedColumns ? (event) => {
            if (hasFixedColumns) {
                updateOverflow(event.currentTarget);
            }
            if (!isVirtualScrollingEnabled(virtualScrolling)) {
                return;
            }
            const { scrollLeft, scrollTop } = event.currentTarget;
            // the table is rendered again only when other rows or columns become visible (a horizontal scrolling doesn't change the rows)
            const areOtherRowsShown = scrollTop !== (virtualScrolling?.scrollTop ?? 0);
            const areOtherColumnsShown = !!columnsRange
                && !isSameColumnsRange(getRenderedColumnsRange(columns, virtualScrolling!, scrollLeft), columnsRange);
            if (areOtherRowsShown || areOtherColumnsShown) {
                dispatch({
                    scrollTop,
                    type: ActionType.ScrollTable,
                    ...(isHorizontalVirtualScrolling && { scrollLeft }),
                });
            }
        } : undefined,
        onKeyDown: keyboardNavigation.onKeyDown,
        onKeyUp: keyboardNavigation.onKeyUp,
    }, props, childComponents.tableWrapper);
    // elementAttributes of childComponents.tableWrapper can set a ref too
    const { ref: customWrapperRef, ...wrapperAttributes }: React.AllHTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> } = tableWrapper.elementAttributes;
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const setWrapperRef = React.useCallback((element: HTMLDivElement | null) => {
        wrapperRef.current = element;
        if (typeof customWrapperRef === 'function') {
            customWrapperRef(element);
        } else if (customWrapperRef) {
            customWrapperRef.current = element;
        }
    }, [customWrapperRef]);

    // the position of the virtual scrolling of the state is shown when the table is mounted, e.g. mounted again
    // with the same table instance; then the state follows the scrolling of the element
    useIsomorphicLayoutEffect(() => {
        const scrollTop = virtualScrolling?.scrollTop;
        if (wrapperRef.current && scrollTop && isVirtualScrollingEnabled(virtualScrolling)) {
            wrapperRef.current.scrollTop = scrollTop;
        }
        const scrollLeft = virtualScrolling?.scrollLeft;
        if (wrapperRef.current && scrollLeft && isHorizontalVirtualScrolling) {
            wrapperRef.current.scrollLeft = scrollLeft;
        }
    }, []);

    // the shadows of the fixed columns follow the sizes of the wrapper and of the table too (e.g. a resized column)
    useIsomorphicLayoutEffect(() => {
        const element = wrapperRef.current;
        if (!element || !hasFixedColumns) {
            return;
        }
        updateOverflow(element);
        if (typeof ResizeObserver === 'undefined') {
            return;
        }
        const observer = new ResizeObserver(() => updateOverflow(element));
        observer.observe(element);
        const table = element.querySelector('table');
        if (table) {
            observer.observe(table);
        }
        return () => observer.disconnect();
    }, [hasFixedColumns, updateOverflow]);

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.table
            + (hasFixedColumns ? ` ${defaultOptions.css.tableFixedColumns}` : '')
            + (overflow.left ? ` ${defaultOptions.css.tableOverflowLeft}` : '')
            + (overflow.right ? ` ${defaultOptions.css.tableOverflowRight}` : ''),
        role: isKeyboardNavigationEnabled(props) ? (props.treeGroupKeyField ? 'treegrid' : 'grid') : undefined,
        'aria-colcount': isHorizontalVirtualScrolling ? preparedOptions.groupColumnsCount + columns.length : undefined,
    }, props, childComponents.table);

    return (
        <KeyboardNavigationContext.Provider value={keyboardNavigation.navigation}>
            <div {...wrapperAttributes} ref={setWrapperRef}>
                {content || tableWrapper.content || (
                    <ColumnIndexesContext.Provider value={columnIndexes}>
                        <table {...elementAttributes}>
                            <ColGroup
                                columns={renderedColumns}
                                groupColumnsCount={preparedOptions.groupColumnsCount}
                            />
                            {(!noData?.hideHeader || !!data.length) && (
                                <ColumnResizeContext.Provider value={columnResizeRef}>
                                    <TableHead
                                        {...props}
                                        areAllRowsSelected={areAllRowsSelected}
                                        childComponents={childComponents}
                                        columnReordering={columnReordering}
                                        columnResizing={columnResizing}
                                        columns={renderedColumns}
                                        dispatch={dispatch}
                                        filteringMode={filteringMode}
                                        groupColumnsCount={preparedOptions.groupColumnsCount}
                                        groupPanel={groupPanel}
                                        sortingMode={sortingMode}
                                    />
                                </ColumnResizeContext.Provider>
                            )}
                            <TableBody
                                {...props}
                                childComponents={childComponents}
                                columnResizeRef={columnResizeRef}
                                columns={renderedColumns}
                                data={preparedOptions.groupedData}
                                editableCells={editableCells}
                                editingMode={editingMode}
                                groupColumnsCount={preparedOptions.groupColumnsCount}
                                groupedColumns={preparedOptions.groupedColumns}
                                groupsExpanded={groupsExpanded}
                                keyboardNavigation={isKeyboardNavigationEnabled(props)}
                                rowReordering={rowReordering}
                                selectedRows={selectedRows}
                            />
                            {(childComponents.tableFoot || childComponents.summaryRow || childComponents.summaryCell) && (
                                <TableFoot {...props}
                                    data={data}
                                    columns={renderedColumns}
                                    groupColumnsCount={preparedOptions.groupColumnsCount} />
                            )}
                        </table>
                    </ColumnIndexesContext.Provider>
                )}
            </div>
        </KeyboardNavigationContext.Provider>
    );
};
