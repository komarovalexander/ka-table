import { getField, getFieldParts, getLastField, getLastFieldParents } from './ColumnUtils';

import { Column } from '../Models/Column';
import { Field, FormatFunc } from '../types';

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

// format doesn't format the value when it returns undefined, null or false (e.g. of condition && ...), 0 and '' are formatted values
export const isFormattedValue = (formattedValue: unknown) => formattedValue != null && formattedValue !== false;

/**
 * The value which the cell shows: the result of format or, when format doesn't format the value, the value as a string
 */
export const getFormattedValue = (value: unknown, column: Column, rowData: unknown, format?: FormatFunc) => {
    const formattedValue = format?.({ column, value, rowData });
    if (isFormattedValue(formattedValue)) {
        return formattedValue;
    }
    return value == null ? undefined : String(value);
};

export const getValueByField = (rowData: any, field: Field) => {
    let value = rowData;
    const names = getFieldParts(field);
    for (let i = 0, n = names.length; i < n; ++i) {
        if (value == null) {
            return undefined;
        }
        value = value[names[i]];
    }
    return value;
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


// the data is not changed when the moved item or the target item is not in it
export const reorderDataByIndex = (data: any[], getKey: (d: any) => any, keyValue: any, targetIndex: number) => {
    const movedIndex = data.findIndex(d => getKey(d) === keyValue);
    if (movedIndex === -1) {
        return data;
    }
    const newData = data.filter(d => getKey(d) !== keyValue);
    newData.splice(targetIndex, 0, data[movedIndex]);
    return newData;
};

export const insertBefore = (data: any[], getKey: (d: any) => any, keyValue: any, targetKeyValue: any) => {
    let targetIndex = data.findIndex(d => getKey(d) === targetKeyValue);
    if (targetIndex === -1) {
        return data;
    }
    const moved = data.findIndex(d => getKey(d) === keyValue);
    if (moved < targetIndex){
        targetIndex = targetIndex - 1;
    }
    return reorderDataByIndex(data, getKey, keyValue, targetIndex);
};

export const reorderData = (data: any[], getKey: (d: any) => any, keyValue: any, targetKeyValue: any) => {
    const targetIndex = data.findIndex(d => getKey(d) === targetKeyValue);
    return targetIndex === -1 ? data : reorderDataByIndex(data, getKey, keyValue, targetIndex);
};

export const checkIndexOdd = (index: number) => {
    return index % 2 !== 0;
}
