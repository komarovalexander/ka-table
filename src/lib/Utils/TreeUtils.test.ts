import { getExpandedParents, getTreeData, treeDataMark, treeGroupMark } from './TreeUtils';

describe('TreeUtils', () => {
  describe('getTreeData', () => {
    it('default', () => {
      const data = [
        { parentId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
        { parentId: 1, id: 2, name: '1 - Data 1', orderCount: 2 },
        { parentId: 1, id: 3, name: '1 - Data 2', orderCount: 3 },
        { parentId: null, id: 4, name: 'Level 1 - 2', orderCount: 7 },
        { parentId: 4, id: 5, name: '2 - Data 1', orderCount: 2 },
        { parentId: 4, id: 6, name: '2 - Data 2', orderCount: 5 },
      ];
      const treeData = getTreeData(data, 'id', 'parentId', undefined);
      expect(treeData).toMatchSnapshot();
    });
    it('2 levels', () => {
      const data = [
        { parentId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
        { parentId: 1, id: 7, name: 'level 2 - 1', orderCount: 5 },
        { parentId: 7, id: 2, name: '1 - 1 - Data 1', orderCount: 2 },
        { parentId: 7, id: 10, name: '1 - 1 - Data 2', orderCount: 2 },
        { parentId: 8, id: 3, name: '1 - 2 - Data 1', orderCount: 3 },
        { parentId: 1, id: 8, name: '1 - level 2 - 2', orderCount: 5 },
        { parentId: null, id: 4, name: 'Level 1 - 2', orderCount: 7 },
        { parentId: 4, id: 5, name: '2 - Data 1', orderCount: 2 },
        { parentId: 4, id: 9, name: '2 - level 2 - 2', orderCount: 5 },
        { parentId: 9, id: 6, name: '2 - 2 - Data 1', orderCount: 5 },
      ];
      const treeData = getTreeData(data, 'id', 'parentId', undefined);
      expect(treeData).toMatchSnapshot();
    });

    it('3 levels', () => {
      const data = [
        { parentId: null, id: 1, name: 'level 1 - 1', orderCount: 5 },
        { parentId: 1, id: 7, name: 'level 2 - 1', orderCount: 5 },
        { parentId: 7, id: 2, name: 'level 3 - 1', orderCount: 2 },
        { parentId: 2, id: 10, name: '1 - 1 - 1 - Data 1', orderCount: 2 },
        { parentId: 1, id: 3, name: '1 - Data 1', orderCount: 3 },
      ];
      const treeData = getTreeData(data, 'id', 'parentId', undefined);
      expect(treeData).toMatchSnapshot();
    });
  });

  describe('getExpandedParents', () => {
    it('default', () => {
      const data = [
        { treeGroupMark, rowData: { parentId: null, id: 1, name: 'level 1', orderCount: 5 }},
        { treeGroupMark, rowData: { parentId: 1, id: 2, name: 'level 2', orderCount: 2 }},
        { treeDataMark, rowData: { parentId: 2, id: 3, name: 'Data 1', orderCount: 2 }}
      ];
      const expandedParents = getExpandedParents(data, 'id');
      expect(expandedParents).toEqual([1, 2]);
    });
  });
});
