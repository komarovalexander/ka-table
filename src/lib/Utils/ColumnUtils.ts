import { Column } from '../models';
import { Field } from '../types';
import defaultOptions from '../defaultOptions';

export const getColumn = (columns: Column[], columnKey: string) => columns.find((c) => c.key === columnKey);

// the width in pixels which the fixed columns and the virtual scrolling of the columns calculate with
export const getColumnWidth = (column: Column): number | undefined => (typeof column.width === 'number' ? column.width : undefined);

// the fixed columns next to the scrolled ones (the last one of the left edge and the first one of the right edge) show the shadow
const edgeFixedColumns = new WeakSet<Column>();

// column.fixed: the offset of a fixed column is the width of the fixed columns between it and its edge
export const getColumnsWithFixedStyle = (columns: Column[]): Column[] => {
    if (!columns.some((column) => column.fixed)) {
        return columns;
    }
    const offsets = new Map<Column, number>();
    const addOffsets = (edgeColumns: Column[], fixed: Column['fixed']) => edgeColumns.reduce((offset, column) => {
        if (column.fixed !== fixed) {
            return offset;
        }
        offsets.set(column, offset);
        return offset + (getColumnWidth(column) || 0);
    }, 0);
    addOffsets(columns, 'left');
    addOffsets([...columns].reverse(), 'right');
    const lastLeftColumn = columns.filter((column) => column.fixed === 'left').pop();
    const firstRightColumn = columns.find((column) => column.fixed === 'right');
    return columns.map((column) => {
        if (!offsets.has(column)) {
            return column;
        }
        // the offset of the style of the column is kept
        const fixedColumn = { ...column, style: { [column.fixed!]: offsets.get(column), ...column.style } };
        if (column === lastLeftColumn || column === firstRightColumn) {
            edgeFixedColumns.add(fixedColumn);
        }
        return fixedColumn;
    });
};

export const getFixedColumnClassName = (column: Column) => {
    if (column.fixed !== 'left' && column.fixed !== 'right') {
        return '';
    }
    const { fixedLeft, fixedLeftLast, fixedRight, fixedRightFirst } = defaultOptions.css;
    const isLeft = column.fixed === 'left';
    return ` ${isLeft ? fixedLeft : fixedRight}${edgeFixedColumns.has(column) ? ` ${isLeft ? fixedLeftLast : fixedRightFirst}` : ''}`;
};

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
    columnKey: unknown;
    replacedOption: string;
    replacedValue: unknown;
}) => {
    const columnIndex = columns.findIndex((c) => c.key === columnKey);
    if (columnIndex === -1) {
        return columns;
    }
    const newColumns = [...columns];
    newColumns[columnIndex] = { ...columns[columnIndex], [replacedOption]: replacedValue };
    return newColumns;
}

// the fields of the header filter popup of a column, which the table changes while the popup is used: the rows don't use them
const headerFilterPopupFields = new Set(['isHeaderFilterPopupShown', 'headerFilterPopupPosition', 'headerFilterSearchValue']);

// the objects have the same values (compared by reference) of all their fields, except the ones which isSameField accepts
const isSameObject = (
    object: unknown,
    otherObject: unknown,
    isSameField: (field: string, value: unknown, otherValue: unknown) => boolean,
): boolean => {
    if (object === otherObject) {
        return true;
    }
    if (!object || !otherObject || typeof object !== 'object' || typeof otherObject !== 'object') {
        return false;
    }
    const values = object as Record<string, unknown>;
    const otherValues = otherObject as Record<string, unknown>;
    const fields = new Set([...Object.keys(values), ...Object.keys(otherValues)]);
    return [...fields].every((field) => values[field] === otherValues[field] || isSameField(field, values[field], otherValues[field]));
};

// the styles differ in their widths only: the resize of a column changes width, style.width, colGroup.width and colGroup.style.width
const isSameExceptWidth = (style: unknown, otherStyle: unknown): boolean => isSameObject(style, otherStyle, (field) => field === 'width');

const isWidthField = (field: string, value: unknown, otherValue: unknown): boolean => (
    field === 'width'
    || (field === 'style' && isSameExceptWidth(value, otherValue))
    || (field === 'colGroup' && isSameObject(value, otherValue, (colGroupField, colGroupValue, otherColGroupValue) => (
        colGroupField === 'width' || (colGroupField === 'style' && isSameExceptWidth(colGroupValue, otherColGroupValue))
    )))
);

/**
 * The columns are the same for the rows: they differ only in the state of their header filter popups and, with isWidthIgnored,
 * in their widths, so the rows don't have to be processed or rendered again
 */
export const areColumnsSameForRows = (columns: Column[], otherColumns: Column[], isWidthIgnored: boolean): boolean => (
    columns === otherColumns
    || (columns.length === otherColumns.length && columns.every((column, index) => isSameObject(column, otherColumns[index], (field, value, otherValue) => (
        headerFilterPopupFields.has(field) || (isWidthIgnored && isWidthField(field, value, otherValue))
    ))))
);
