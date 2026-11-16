import { getField, getFieldParts, getLastField, getLastFieldParents } from './ColumnUtils';

import { Column } from '../Models/Column';
import { Field, FormatFunc } from '../types';

export const getParentValue = (rowData: unknown, fieldParents: Field[]): Record<string, unknown> | undefined => {
    const parentValue = fieldParents.reduce<unknown>((previousValue, currentValue) => (
        previousValue && (previousValue as Record<string, unknown>)[currentValue]
    ),
    rowData);
    return parentValue ? { ...(parentValue as Record<string, unknown>) } : undefined;
};

export const createObjByFields = (fieldParents: Field[], field: Field, value: unknown) => {
    const parentValue: Record<string, unknown> = {};
    if (fieldParents.length) {
        fieldParents.reduce((previousValue, currentItem, currentIndex) => {
            const lastObj: Record<string, unknown> = {};
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

export const getValueByColumn = (rowData: unknown, column: Column) => {
    return getValueByField(rowData, getField(column));
};

// the value of a text or a number input: a number stays a number, so a number input keeps the typed text, e.g. '1.'
export const getInputValue = (value: unknown): string | number => (typeof value === 'number' ? value : value == null ? '' : String(value));

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

export const getValueByField = (rowData: unknown, field: Field): unknown => {
    let value = rowData;
    const names = getFieldParts(field);
    for (let i = 0, n = names.length; i < n; ++i) {
        if (value == null) {
            return undefined;
        }
        value = (value as Record<string, unknown>)[names[i]];
    }
    return value;
};

const replaceValueForField = (rowData: unknown, field: Field, newValue: unknown, fieldParents?: Field[]): Record<string, unknown> => {
    let result: Record<string, unknown> = { ...(rowData as Record<string, unknown>) };
    if (fieldParents && fieldParents.length) {
        const parentValue: Record<string, unknown> = getParentValue(result, fieldParents) || {};
        parentValue[field] = newValue;

        const parentsOfParent = [...fieldParents];
        const parentFieldName = parentsOfParent.pop() as string;
        result = replaceValueForField(result, parentFieldName, parentValue, parentsOfParent);
    } else {
        result[field] = newValue;
    }
    return result;
};

// a copy of the row with the new value of the column
export const replaceValue = <TData>(rowData: TData, column: Column, newValue: unknown): TData => {
    const field = getField(column);
    return replaceValueForField(rowData, getLastField(field), newValue, getLastFieldParents(field)) as TData;
};


// the data is not changed when the moved item or the target item is not in it
export const reorderDataByIndex = <TData>(data: TData[], getKey: (d: TData) => unknown, keyValue: unknown, targetIndex: number): TData[] => {
    const movedIndex = data.findIndex(d => getKey(d) === keyValue);
    if (movedIndex === -1) {
        return data;
    }
    const newData = data.filter(d => getKey(d) !== keyValue);
    newData.splice(targetIndex, 0, data[movedIndex]);
    return newData;
};

export const insertBefore = <TData>(data: TData[], getKey: (d: TData) => unknown, keyValue: unknown, targetKeyValue: unknown): TData[] => {
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

export const reorderData = <TData>(data: TData[], getKey: (d: TData) => unknown, keyValue: unknown, targetKeyValue: unknown): TData[] => {
    const targetIndex = data.findIndex(d => getKey(d) === targetKeyValue);
    return targetIndex === -1 ? data : reorderDataByIndex(data, getKey, keyValue, targetIndex);
};

export const checkIndexOdd = (index: number) => {
    return index % 2 !== 0;
}
