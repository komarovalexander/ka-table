
import { getValueByField } from './DataUtils';

export const treeGroupMark = {};
export const treeDataMark = {};


export const getExpandedParents = (treeData: any[], rowKeyField: any): any[][] =>
  treeData
    .filter((item) => item.treeGroupMark === treeGroupMark)
    .map((item) => getValueByField(item.rowData, rowKeyField));

const getItemStructure = (
  item: any,
  dataHash: any,
  rowKeyField: any,
  deep: number = 0): any[] => {
    const children = dataHash[getValueByField(item, rowKeyField)];
    if (!children){
      return [{ treeDataMark, rowData: item, deep: deep + 1 }];
    }
    const result = [{ treeGroupMark, rowData: item, deep }];
    children.forEach((c: any) => {
      const childrenData = getItemStructure(c, dataHash, rowKeyField, deep + 1);
      result.push(...childrenData);
    });
    return result;
};

export const getTreeData = (
  data: any[],
  rowKeyField: any,
  parentRowKeyField: any,
  parentsExpanded?: any[][]): any[] => {
    const dataHash: any = {};
    const rootElements: any[] = [];
    data.forEach(d => {
      const parentRowKeyValue = getValueByField(d, parentRowKeyField) ?? undefined;
      if (!parentRowKeyValue){
        rootElements.push(d);
        return;
      }
      if (!dataHash[parentRowKeyValue]){
        dataHash[parentRowKeyValue] = [];
      }
      if (!parentsExpanded || parentsExpanded.includes(parentRowKeyValue)) {
        dataHash[parentRowKeyValue].push(d);
      }
    });
    const newData: any[] = [];
    rootElements.forEach(d => {
      newData.push(...getItemStructure(d, dataHash, rowKeyField));
    });
    return newData;
};

