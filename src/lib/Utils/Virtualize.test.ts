import {
    getRenderedColumnsRange, getScrollLeftToColumn, getVirtualized, getVirtualizedColumns, isHorizontalVirtualScrollingEnabled,
    isVirtualColumnSpacer, isVirtualScrollingEnabled,
} from './Virtualize';

import { Column } from '../Models/Column';

import { VirtualScrolling } from '../Models/VirtualScrolling';
import { getTreeData } from './TreeUtils';

describe('Virtualize', () => {
    const data: number[] = new Array(100).fill(0).map((_, index) => index);
    describe('getVirtualized', () => {
        it('scrollTop 0', () => {
            const virtualScrolling: VirtualScrolling = {
                itemHeight: () => 10,
                scrollTop: 0,
                tbodyHeight: 40,
            };
            const result = getVirtualized(virtualScrolling, data);

            expect(result).toMatchSnapshot();
        });

        it('scrollTop 100', () => {
            const virtualScrolling: VirtualScrolling = {
                itemHeight: () => 10,
                scrollTop: 100,
                tbodyHeight: 40,
            };
            const result = getVirtualized(virtualScrolling, data);

            expect(result).toMatchSnapshot();
        });

        it('scrollTop 100 bottomInvisibleCount', () => {
            const virtualScrolling: VirtualScrolling = {
                itemHeight: () => 10,
                scrollTop: 100,
                tbodyHeight: 40,
                bottomInvisibleCount: 10
            };
            const result = getVirtualized(virtualScrolling, data);

            expect(result).toMatchSnapshot();
        });
        it('scrollTop 900 topInvisibleCount', () => {
            const virtualScrolling: VirtualScrolling = {
                itemHeight: () => 10,
                scrollTop: 900,
                tbodyHeight: 40,
                topInvisibleCount: 10
            };
            const result = getVirtualized(virtualScrolling, data);

            expect(result).toMatchSnapshot();
        });

        it('scrollTop 900', () => {
            const virtualScrolling: VirtualScrolling = {
                itemHeight: () => 10,
                scrollTop: 900,
                tbodyHeight: 40,
            };
            const result = getVirtualized(virtualScrolling, data);

            expect(result).toMatchSnapshot();
        });

        it('itemHeight 40', () => {
            const virtualScrolling: VirtualScrolling = {
                itemHeight: 40,
                scrollTop: 0,
                tbodyHeight: 160,
            };
            const result = getVirtualized(virtualScrolling, data);

            expect(result).toMatchSnapshot();
        });

        it('with new row', () => {
            const virtualScrolling: VirtualScrolling = {
                itemHeight: () => 10,
                scrollTop: 100,
                tbodyHeight: 40,
            };
            const result = getVirtualized(virtualScrolling, data, true);

            expect(result).toMatchSnapshot();
        });

        describe('the stripe of oddEvenRows of the first visible row', () => {
            const virtualScrolling = (scrollTop: number): VirtualScrolling => ({ itemHeight: 10, scrollTop, tbodyHeight: 40 });
            // the roots 0, 1, 2... with the children 0-1 and 0-2
            const rows = Array.from({ length: 10 }, (_, root) => root).flatMap((root) => [
                { id: `${root}`, parentId: null },
                { id: `${root}-1`, parentId: `${root}` },
                { id: `${root}-2`, parentId: `${root}` },
            ]);
            const treeData = getTreeData({ data: rows, originalData: rows, rowKeyField: 'id', treeGroupKeyField: 'parentId' });
            const getFirstVisibleRow = (scrollTop: number, oddEvenRows: boolean | 'treeRoots') => {
                const { virtualizedData, isFirstVisibleRowOdd } = getVirtualized(virtualScrolling(scrollTop), treeData, false, oddEvenRows);
                return [virtualizedData[0].rowData.id, isFirstVisibleRowOdd];
            };
            it('is its index', () => {
                // the rows from 9 and from 10
                expect(getVirtualized(virtualScrolling(100), data, false, true).isFirstVisibleRowOdd).toBe(true);
                expect(getVirtualized(virtualScrolling(110), data, false, true).isFirstVisibleRowOdd).toBe(false);
                // the rows of a tree from 4
                expect(getFirstVisibleRow(50, true)).toEqual(['1-1', false]);
            });
            it('is the stripe of its root with treeRoots', () => {
                expect(getFirstVisibleRow(50, 'treeRoots')).toEqual(['1-1', true]);
                expect(getFirstVisibleRow(70, 'treeRoots')).toEqual(['2', false]);
                expect(getFirstVisibleRow(90, 'treeRoots')).toEqual(['2-2', false]);
                expect(getFirstVisibleRow(100, 'treeRoots')).toEqual(['3', true]);
            });
        });
    });

    it('isVirtualScrollingEnabled', () => {
        expect(isVirtualScrollingEnabled()).toBeFalsy();
        expect(isVirtualScrollingEnabled({})).toBeTruthy();
        expect(isVirtualScrollingEnabled({ enabled: true })).toBeTruthy();
        expect(isVirtualScrollingEnabled({ enabled: false })).toBeFalsy();
    });

    describe('the virtual scrolling of the columns (#495)', () => {
        // 20 columns of 100px, 400px are visible
        const columns: Column[] = Array.from({ length: 20 }, (_, index) => ({ key: `c${index}`, width: 100 }));
        const virtualScrolling = { horizontal: true, tableWidth: 400 };
        const getKeys = (virtualizedColumns: Column[]) => virtualizedColumns.map((column) => (
            isVirtualColumnSpacer(column) ? `spacer ${column.width}` : column.key
        ));
        it('isHorizontalVirtualScrollingEnabled', () => {
            expect(isHorizontalVirtualScrollingEnabled({ horizontal: true })).toBe(true);
            expect(isHorizontalVirtualScrollingEnabled({ enabled: false, horizontal: true })).toBe(false);
            expect(isHorizontalVirtualScrollingEnabled({ enabled: true })).toBe(false);
            expect(isHorizontalVirtualScrollingEnabled()).toBe(false);
        });
        it('getRenderedColumnsRange: the visible columns and 2 columns around them', () => {
            expect(getRenderedColumnsRange(columns, virtualScrolling)).toEqual({ first: 0, last: 5 });
            expect(getRenderedColumnsRange(columns, { ...virtualScrolling, scrollLeft: 1050 })).toEqual({ first: 8, last: 16 });
            expect(getRenderedColumnsRange(columns, virtualScrolling, 1600)).toEqual({ first: 14, last: 19 });
            expect(getRenderedColumnsRange(columns, { ...virtualScrolling, leftInvisibleCount: 0, rightInvisibleCount: 1 }, 1000)).toEqual({ first: 10, last: 14 });
            // scrolled further than the columns
            expect(getRenderedColumnsRange(columns, virtualScrolling, 5000)).toEqual({ first: 17, last: 19 });
        });
        it('getVirtualizedColumns: the spacers have the width of the columns which they replace', () => {
            expect(getKeys(getVirtualizedColumns(columns, { first: 8, last: 10 }))).toEqual(['spacer 800', 'c8', 'c9', 'c10', 'spacer 900']);
            expect(getKeys(getVirtualizedColumns(columns, { first: 0, last: 19 }))).toEqual(columns.map((column) => column.key));
        });
        it('getVirtualizedColumns renders the fixed columns and the columns without a numeric width', () => {
            const otherColumns = columns.map((column, index) => (
                index === 0 ? { ...column, fixed: 'left' as const } : index === 3 ? { ...column, width: '10%' } : column
            ));
            expect(getKeys(getVirtualizedColumns(otherColumns, { first: 8, last: 9 }))).toEqual(['c0', 'spacer 200', 'c3', 'spacer 400', 'c8', 'c9', 'spacer 1000']);
        });
        it('getScrollLeftToColumn: the scrollLeft which shows the column', () => {
            expect(getScrollLeftToColumn(columns, 'c2', virtualScrolling)).toBeUndefined();
            expect(getScrollLeftToColumn(columns, 'c6', virtualScrolling)).toBe(300);
            expect(getScrollLeftToColumn(columns, 'c1', { ...virtualScrolling, scrollLeft: 500 })).toBe(100);
            expect(getScrollLeftToColumn([{ ...columns[0], fixed: 'left' }, ...columns.slice(1)], 'c0', { ...virtualScrolling, scrollLeft: 500 })).toBeUndefined();
        });
    });
});
