import { Column } from '../models';
import { Field } from '../types';
import defaultOptions from '../defaultOptions';

export const getColumn = (columns: Column[], columnKey: string) => columns.find((c) => c.key === columnKey);

export const getField = (column: Column): Field => {
    return column.field || column.key;
};

export const getLastField = (field: Field): Field => {
    if (defaultOptions.fieldDelimiter) {
        return field.split(defaultOptions.fieldDelimiter).pop()!;
    }
    return field;
};

export const getFieldParts = (field: Field): Field[] => {
    return defaultOptions.fieldDelimiter ? field.split(defaultOptions.fieldDelimiter) : [field];
};

export const getLastFieldParents = (field: Field): Field[] => {
    if (defaultOptions.fieldDelimiter) {
        const fieldParents = field.split(defaultOptions.fieldDelimiter);
        fieldParents.pop();
        return fieldParents;
    }
    return [];
};
export const replaceColumnValue = ({
    columns,
    columnKey,
    replacedOption,
    replacedValue
}: {
    columns: Column[],
    columnKey: any;
    replacedOption: string;
    replacedValue: any;
}) => {
    const columnIndex = columns.findIndex((c) => c.key === columnKey);
    if (columnIndex === -1) {
        return columns;
    }
    const newColumns = [...columns];
    newColumns[columnIndex] = { ...columns[columnIndex], [replacedOption]: replacedValue };
    return newColumns;
}
