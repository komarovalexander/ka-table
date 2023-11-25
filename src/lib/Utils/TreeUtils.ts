
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
    treeDeep: number = 0): any[] => {
    const children = dataHash[getValueByField(item, rowKeyField)];
    if (!children){
        return [{ treeDataMark, rowData: item, treeDeep: treeDeep + 1 }];
    }
    const result = [{ treeGroupMark, rowData: item, treeDeep }];
    children.forEach((c: any) => {
        const childrenData = getItemStructure(c, dataHash, rowKeyField, treeDeep + 1);
        result.push(...childrenData);
    });
    return result;
};

export const getTreeGroupChain = (keyValue: any, dataMap: any, treeGroupKeyField: any, treeGroupKeyValues: any[], groupChain: any = []): any[] => {
    const value = dataMap[keyValue];
    let chain = groupChain;

    if (!treeGroupKeyValues.includes(keyValue)){
        treeGroupKeyValues.push(keyValue);
        chain = [...groupChain, value];
    }

    const treeGroupKeyValue = getValueByField(value, treeGroupKeyField);
    if (treeGroupKeyValue){
        return getTreeGroupChain(treeGroupKeyValue, dataMap, treeGroupKeyField, treeGroupKeyValues, chain);
    }
    return chain;
};

export const restoreFilteredData = ({
    data,
    originalData,
    rowKeyField,
    treeGroupKeyField,
    treeGroupsExpanded
}: {
    data: any[],
    originalData: any[],
    rowKeyField: any,
    treeGroupKeyField: any,
    treeGroupsExpanded?: any[][]
}): any[] => {
    let filteredData: any[] = [];
    const treeGroupKeyValues = data.map(d => getValueByField(d, rowKeyField));
    const dataMap = originalData.reduce((acc, d) => {
        acc[getValueByField(d, rowKeyField)] = d;
        return acc;
    }, {});
    data.forEach(d => {
        const treeGroupKeyValue = getValueByField(d, treeGroupKeyField);
        if (treeGroupKeyValues.includes(treeGroupKeyValue) || !treeGroupKeyValue){
            filteredData.push(d);
        } else {
            const groupsChain = getTreeGroupChain(treeGroupKeyValue, dataMap, treeGroupKeyField, treeGroupKeyValues);
            filteredData = [...filteredData, ...groupsChain, d];
        }
    });
    return filteredData;
}

const getDataHashAndRootElements = ({
    data,
    treeGroupKeyField,
    treeGroupsExpanded
}: {
    data: any[],
    treeGroupKeyField: any,
    treeGroupsExpanded?: any[][]
}) => {
    const dataHash: any = {};
    const rootElements: any[] = [];
    data.forEach(d => {
        const parentRowKeyValue = getValueByField(d, treeGroupKeyField) ?? undefined;
        if (!parentRowKeyValue){
            rootElements.push(d);
            return;
        }
        if (!dataHash[parentRowKeyValue]){
            dataHash[parentRowKeyValue] = [];
        }
        if (!treeGroupsExpanded || treeGroupsExpanded.includes(parentRowKeyValue)) {
            dataHash[parentRowKeyValue].push(d);
        }
    });
    return { dataHash, rootElements };
};

export const getTreeData = ({
    data,
    originalData,
    rowKeyField,
    treeGroupKeyField,
    treeGroupsExpanded
}: {
    data: any[],
    originalData: any[],
    rowKeyField: any,
    treeGroupKeyField: any,
    treeGroupsExpanded?: any[][]
}): any[] => {
    if (data.length !== originalData.length){
        data = restoreFilteredData({
            data,
            originalData,
            rowKeyField,
            treeGroupKeyField,
            treeGroupsExpanded
        });
    }
    const { dataHash, rootElements } = getDataHashAndRootElements({
        data,
        treeGroupKeyField,
        treeGroupsExpanded
    });
    const newData: any[] = [];
    rootElements.forEach(d => {
        newData.push(...getItemStructure(d, dataHash, rowKeyField));
    });
    return newData;
};

