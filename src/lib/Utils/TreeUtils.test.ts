import {
    getExpandedParents, getTreeData, getTreeRowLevel, isTreeChildRow, restoreFilteredData, treeDataMark, treeGroupMark,
} from './TreeUtils';

describe('TreeUtils', () => {
    describe('getTreeData', () => {
        it('default', () => {
            const data = [
                { treeGroupId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
                { treeGroupId: 1, id: 2, name: '1 - Data 1', orderCount: 2 },
                { treeGroupId: 1, id: 3, name: '1 - Data 2', orderCount: 3 },
                { treeGroupId: null, id: 4, name: 'Level 1 - 2', orderCount: 7 },
                { treeGroupId: 4, id: 5, name: '2 - Data 1', orderCount: 2 },
                { treeGroupId: 4, id: 6, name: '2 - Data 2', orderCount: 5 },
            ];
            const treeData = getTreeData({ data, rowKeyField: 'id', treeGroupKeyField: 'treeGroupId', originalData: data });
            expect(treeData).toMatchSnapshot();
        });
        it('2 levels', () => {
            const data = [
                { treeGroupId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
                { treeGroupId: 1, id: 7, name: 'level 2 - 1', orderCount: 5 },
                { treeGroupId: 7, id: 2, name: '1 - 1 - Data 1', orderCount: 2 },
                { treeGroupId: 7, id: 10, name: '1 - 1 - Data 2', orderCount: 2 },
                { treeGroupId: 8, id: 3, name: '1 - 2 - Data 1', orderCount: 3 },
                { treeGroupId: 1, id: 8, name: '1 - level 2 - 2', orderCount: 5 },
                { treeGroupId: null, id: 4, name: 'Level 1 - 2', orderCount: 7 },
                { treeGroupId: 4, id: 5, name: '2 - Data 1', orderCount: 2 },
                { treeGroupId: 4, id: 9, name: '2 - level 2 - 2', orderCount: 5 },
                { treeGroupId: 9, id: 6, name: '2 - 2 - Data 1', orderCount: 5 },
            ];
            const treeData = getTreeData({ data, rowKeyField: 'id', treeGroupKeyField: 'treeGroupId', originalData: data });
            expect(treeData).toMatchSnapshot();
        });

        it('3 levels', () => {
            const data = [
                { treeGroupId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
                { treeGroupId: 1, id: 7, name: 'level 2 - 1', orderCount: 5 },
                { treeGroupId: 7, id: 2, name: 'level 3 - 1', orderCount: 2 },
                { treeGroupId: 2, id: 10, name: '1 - 1 - 1 - Data 1', orderCount: 2 },
                { treeGroupId: 1, id: 3, name: '1 - Data 1', orderCount: 3 },
            ];
            const treeData = getTreeData({ data, rowKeyField: 'id', treeGroupKeyField: 'treeGroupId', originalData: data });
            expect(treeData).toMatchSnapshot();
        });
        it('contains filtered data', () => {
            const originalData = [
                { treeGroupId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
                { treeGroupId: 1, id: 2, name: '1 - Data 1', orderCount: 2 },
                { treeGroupId: 1, id: 3, name: '1 - Data 2', orderCount: 3 },
                { treeGroupId: null, id: 4, name: 'Level 1 - 2', orderCount: 7 },
                { treeGroupId: 4, id: 5, name: '2 - Data 1', orderCount: 2 },
                { treeGroupId: 4, id: 6, name: '2 - Data 2', orderCount: 5 },
            ];
            const data = [
                { treeGroupId: 1, id: 3, name: '1 - Data 2', orderCount: 3 },
                { treeGroupId: null, id: 4, name: 'Level 1 - 2', orderCount: 7 },
            ];
            const treeData = getTreeData({ data, rowKeyField: 'id', treeGroupKeyField: 'treeGroupId', originalData });
            expect(treeData).toMatchSnapshot();
        });
        it('a root with 150000 children', () => {
            // push(...rows) of the children exceeded the limit of the arguments of a function
            const data = [{ id: 0, parentId: null }, ...Array.from({ length: 150000 }, (_, index) => ({ id: index + 1, parentId: 0 }))];
            const treeData = getTreeData({ data, rowKeyField: 'id', treeGroupKeyField: 'parentId', originalData: data });
            expect(treeData.length).toBe(150001);
            expect(treeData[150000]).toEqual({ treeDataMark, rowData: { id: 150000, parentId: 0 }, treeDeep: 2 });
        });
    });
    describe('the keys which are the names of the members of Object', () => {
        it.each(['constructor', 'toString', '__proto__'])('%s', (id) => {
            const data = [{ id, parentId: null }, { id: 'child', parentId: id }, { id: 'other', parentId: null }];
            const getRows = (shownData: typeof data) => getTreeData({ data: shownData, originalData: data, rowKeyField: 'id', treeGroupKeyField: 'parentId' })
                .map((item) => [item.rowData.id, item.treeDeep, item.treeGroupMark === treeGroupMark]);
            expect(getRows(data)).toEqual([[id, 0, true], ['child', 2, false], ['other', 1, false]]);
            // the found child restores its parent
            expect(getRows([data[1]])).toEqual([[id, 0, true], ['child', 2, false]]);
        });
    });
    describe('restoreFilteredData', () => {
        it('default', () => {
            const originalData = [
                { treeGroupId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
                { treeGroupId: 1, id: 2, name: '1 - Data 1', orderCount: 2 },
                { treeGroupId: 1, id: 3, name: '1 - Data 2', orderCount: 3 },
                { treeGroupId: null, id: 4, name: 'Level 1 - 2', orderCount: 7 },
                { treeGroupId: 4, id: 5, name: '2 - Data 1', orderCount: 2 },
                { treeGroupId: 4, id: 6, name: '2 - Data 2', orderCount: 5 },
            ];
            const data = [
                { treeGroupId: 1, id: 3, name: '1 - Data 2', orderCount: 3 },
                { treeGroupId: null, id: 4, name: 'Level 1 - 2', orderCount: 7 },
            ];
            const treeData = restoreFilteredData({ data, rowKeyField: 'id', treeGroupKeyField: 'treeGroupId', originalData });
            expect(treeData).toMatchSnapshot();
        });
        it('2 levels', () => {
            const originalData = [
                { treeGroupId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
                { treeGroupId: 1, id: 2, name: '1 - Data 1', orderCount: 2 },
                { treeGroupId: 1, id: 3, name: '1 - Data 2', orderCount: 3 },
                { treeGroupId: null, id: 9, name: 'Level 1 - 2', orderCount: 7 },
                { treeGroupId: 9, id: 4, name: 'Level 2 - 2 - 1', orderCount: 7 },
                { treeGroupId: 4, id: 5, name: '2 - 1 - Data 1', orderCount: 2 },
                { treeGroupId: 4, id: 6, name: '2 - 1 - Data 2', orderCount: 5 },
                { treeGroupId: 9, id: 10, name: 'Level 2 - 2 - 2', orderCount: 7 },
                { treeGroupId: 10, id: 11, name: '2 - 2 - Data 1', orderCount: 2 },
                { treeGroupId: 10, id: 12, name: '2 - 2 - Data 2', orderCount: 5 },
            ];
            const data = [
                { treeGroupId: 4, id: 6, name: '2 - 1 - Data 2', orderCount: 5 },
                { treeGroupId: 10, id: 12, name: '2 - 2 - Data 2', orderCount: 5 },
            ];
            const treeData = restoreFilteredData({ data, rowKeyField: 'id', treeGroupKeyField: 'treeGroupId', originalData });
            expect(treeData).toMatchSnapshot();
        });

    });


    describe('the parents of the rows', () => {
        type Row = { id: number, parentId: number | null };
        const getRows = (data: Row[], shownData = data) => getTreeData({ data: shownData, originalData: data, rowKeyField: 'id', treeGroupKeyField: 'parentId' })
            .map((item) => [item.rowData.id, item.treeDeep, item.treeGroupMark === treeGroupMark]);
        it('a parent with the key 0', () => {
            expect(getRows([{ id: 0, parentId: null }, { id: 1, parentId: 0 }])).toEqual([[0, 0, true], [1, 2, false]]);
        });
        it('a row whose parent is not in the data is a root', () => {
            const data = [{ id: 1, parentId: null }, { id: 2, parentId: 99 }];
            expect(getRows(data)).toEqual([[1, 1, false], [2, 1, false]]);
            expect(getRows(data, [data[1]])).toEqual([[2, 1, false]]);
        });
        it('a row whose parent is the row itself is a root', () => {
            expect(getRows([{ id: 0, parentId: 0 }, { id: 1, parentId: 0 }, { id: 5, parentId: 5 }])).toEqual([[0, 0, true], [1, 2, false], [5, 1, false]]);
        });
        it('a found row with a cycle of its parents', () => {
            const data = [{ id: 1, parentId: 2 }, { id: 2, parentId: 1 }, { id: 3, parentId: 1 }];
            expect(() => getRows(data, [data[2]])).not.toThrow();
        });
        it('the parents of the found rows keep the order of the data', () => {
            const data = [{ id: 1, parentId: null }, { id: 2, parentId: null }, { id: 3, parentId: 2 }, { id: 4, parentId: 1 }];
            expect(getRows(data, [data[2], data[3]]).map(([id]) => id)).toEqual([1, 4, 2, 3]);
            // the copies of the rows (e.g. of extendedFilter) are ordered by their keys, the new rows follow the data
            expect(getRows(data, [{ id: 5, parentId: 2 }, { ...data[3] }, { ...data[2] }]).map(([id]) => id)).toEqual([1, 4, 2, 3, 5]);
        });
    });

    describe('the levels of the rows', () => {
        // a root without children, a root with a child which has a child
        const data = [{ id: 1, parentId: null }, { id: 2, parentId: null }, { id: 3, parentId: 2 }, { id: 4, parentId: 3 }];
        const treeData = getTreeData({ data, originalData: data, rowKeyField: 'id', treeGroupKeyField: 'parentId' });
        it('getTreeRowLevel', () => {
            expect(treeData.map((row) => getTreeRowLevel(row))).toEqual([1, 1, 2, 3]);
        });
        it('isTreeChildRow', () => {
            expect(treeData.map((row) => isTreeChildRow(row))).toEqual([false, false, true, true]);
            expect(isTreeChildRow(data[3])).toBe(false);
        });
    });

    describe('getExpandedParents', () => {
        it('default', () => {
            const data = [
                { treeGroupMark, rowData: { treeGroupId: null, id: 1, name: 'level 1', orderCount: 5 }},
                { treeGroupMark, rowData: { treeGroupId: 1, id: 2, name: 'level 2', orderCount: 2 }},
                { treeDataMark, rowData: { treeGroupId: 2, id: 3, name: 'Data 1', orderCount: 2 }}
            ];
            const expandedParents = getExpandedParents(data, 'id');
            expect(expandedParents).toEqual([1, 2]);
        });
    });
});
