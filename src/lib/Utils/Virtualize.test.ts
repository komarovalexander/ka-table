import { getVirtualized, isVirtualScrollingEnabled } from './Virtualize';

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
});
