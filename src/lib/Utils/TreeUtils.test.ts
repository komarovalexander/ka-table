import {
    getExpandedParents, getTreeData, restoreFilteredData, treeDataMark, treeGroupMark,
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
