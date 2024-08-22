import { getField, getFieldParts, getLastField, getLastFieldParents } from './ColumnUtils';

import { Column } from '../Models/Column';
import { Field } from '../types';

export const getParentValue = (rowData: any, fieldParents: Field[]) => {
    const parentValue = fieldParents.reduce((previousValue, currentValue) => {
        const result = (previousValue && previousValue[currentValue]);
        return result !== undefined ? result : undefined;
    },
    rowData);
    return parentValue ? { ...parentValue } : undefined;
};

export const createObjByFields = (fieldParents: Field[], field: Field, value: any) => {
    const parentValue: any = {};
    if (fieldParents.length) {
        fieldParents.reduce((previousValue, currentItem, currentIndex) => {
            const lastObj: any = {};
            previousValue[currentItem] = lastObj;
            if (currentIndex === (fieldParents.length - 1)) {
                lastObj[field] = value;
            }
            return lastObj;
        },
        parentValue);
    } else {
        parentValue[field] = value;
    }
    return { ...parentValue };
};

export const getValueByColumn = (rowData: any, column: Column) => {
    return getValueByField(rowData, getField(column));
};

export const getValueByField = (rowData: any, field: Field) => {
    let o = { ...rowData };
    const names = getFieldParts(field);
    for (let i = 0, n = names.length; i < n; ++i) {
        const k = names[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

const replaceValueForField = (rowData: any, field: Field, newValue: any, fieldParents?: Field[]): any => {
    let result = { ...rowData };
    if (fieldParents && fieldParents.length) {
        const parentValue = getParentValue(result, fieldParents) || {};
        parentValue[field] = newValue;

        const parentsOfParent = [...fieldParents];
        const parentFieldName = parentsOfParent.pop() as string;
        result = replaceValueForField(result, parentFieldName, parentValue, parentsOfParent);
    } else {
        result[field] = newValue;
    }
    return result;
};

export const replaceValue = (rowData: any, column: Column, newValue: any) => {
    const field = getField(column);
    return replaceValueForField(rowData, getLastField(field), newValue, getLastFieldParents(field));
};


export const reorderDataByIndex = (data: any[], getKey: (d: any) => any, keyValue: any, targetIndex: number) => {
    const moved = data.find(d => getKey(d) === keyValue);
    const newData = data.filter(d => getKey(d) !== keyValue);
    newData.splice(targetIndex, 0, moved);
    return newData;
};

export const insertBefore = (data: any[], getKey: (d: any) => any, keyValue: any, targetKeyValue: any) => {
    let targetIndex = data.findIndex(d => getKey(d) === targetKeyValue);
    const moved = data.findIndex(d => getKey(d) === keyValue);
    if (moved < targetIndex){
        targetIndex = targetIndex - 1;
    }
    return reorderDataByIndex(data, getKey, keyValue, targetIndex);
};

export const reorderData = (data: any[], getKey: (d: any) => any, keyValue: any, targetKeyValue: any) => {
    const targetIndex = data.findIndex(d => getKey(d) === targetKeyValue);
    return reorderDataByIndex(data, getKey, keyValue, targetIndex);
};

export const checkRowOdd = (data: any[], rowData: any) => {
    return data?.indexOf(rowData) % 2 !== 0;
}
