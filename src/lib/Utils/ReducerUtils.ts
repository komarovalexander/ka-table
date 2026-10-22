import { ITableProps } from '../';
import { Column, EditableCell } from '../models';
import { ValidationFunc } from '../types';
import { getValueByColumn, getValueByField, replaceValue } from './DataUtils';

const hasEditorValue = (cell: EditableCell) => Object.prototype.hasOwnProperty.call(cell, 'editorValue');

const getRowDataWithEditorValues = (rowData: unknown, rowEditableCells: EditableCell[], columns: Column[]): unknown =>
    rowEditableCells.reduce((editedRowData, cell) => {
        const column = columns.find((c) => c.key === cell.columnKey);
        return column && hasEditorValue(cell) ? replaceValue(editedRowData, column, cell.editorValue) : editedRowData;
    }, rowData ?? {});

/**
 * Validates the editors: validation gets the row with the values of all its editors,
 * so the values of a row are checked together (e.g. start <= end), and the new row is validated too
 */
export const getValidatedEditableCells = ({
    data,
    editableCells = [],
    columns,
    rowKeyField,
    validation
}: {
    data?: any[],
    editableCells?: EditableCell[],
    columns: Column[],
    rowKeyField: string,
    validation?: ValidationFunc
}): EditableCell[] => {
    // the first row of a key, as data.find() and the saving of the row
    const rowsByKey = new Map<unknown, unknown>();
    data?.forEach((d) => {
        const rowKeyValue = getValueByField(d, rowKeyField);
        if (!rowsByKey.has(rowKeyValue)) {
            rowsByKey.set(rowKeyValue, d);
        }
    });
    const editableCellsByRow = new Map<unknown, EditableCell[]>();
    editableCells.forEach((cell) => {
        editableCellsByRow.set(cell.rowKeyValue, [...editableCellsByRow.get(cell.rowKeyValue) || [], cell]);
    });
    const editedRows = new Map<unknown, unknown>();
    const getEditedRowData = (rowKeyValue: unknown) => {
        if (!editedRows.has(rowKeyValue)) {
            editedRows.set(rowKeyValue, getRowDataWithEditorValues(rowsByKey.get(rowKeyValue), editableCellsByRow.get(rowKeyValue) || [], columns));
        }
        return editedRows.get(rowKeyValue);
    };
    return editableCells.map(cell => {
        const column = columns.find((c) => c.key === cell.columnKey)!;
        const rowData = getEditedRowData(cell.rowKeyValue);
        let value = cell.editorValue;
        if (!hasEditorValue(cell)) {
            value = column ? getValueByColumn(rowData, column) : getValueByField(rowData, cell.columnKey);
        }
        return {
            ...cell,
            validationMessage: validation && validation({
                column,
                rowData,
                value
            })
        }
    });
}

export const getEditableCellsByData = (data: any[], rowKeyField: string, columns: Column[]) => {
    const editableCells: EditableCell[] = [];
    data?.forEach((rowData) => {
        const rowKeyValue = getValueByField(rowData, rowKeyField);
        columns.forEach(column => {
            if (column.isEditable !== false) {
                editableCells.push({ columnKey: column.key, rowKeyValue });
            }
        });
    });
    return editableCells;
}

export const addColumnsToRowEditableCells = (editableCells: EditableCell[], columns: Column[], rowKeyValue: any) => {
    const newEditableCells = [...editableCells];
    columns.forEach(column => {
        if (column.isEditable !== false
      && !newEditableCells.some(e => e.columnKey === column.key && e.rowKeyValue === rowKeyValue)) {
            newEditableCells.push({
                columnKey: column.key,
                rowKeyValue
            });
        }
    });
    return newEditableCells;
}

export const insertOrReplaceRow = (data: any[], rowData: any, rowKeyField: string) => {
    const rowKeyValue = getValueByField(rowData, rowKeyField);
    const rowIndex = data.findIndex((d) => getValueByField(d, rowKeyField) === rowKeyValue);
    if (rowIndex === -1) {
        return [...data, rowData];
    }
    const newData = [...data];
    newData[rowIndex] = rowData;
    return newData;
}

export const addRowKeyValuesToSelectedRows = (selectedRows: any[], rowKeyValues: any[]) => {
    const selectedRowsSet = new Set(selectedRows);
    const newSelectedRows = [...selectedRows];
    rowKeyValues.forEach((rowKeyValue) => {
        if (!selectedRowsSet.has(rowKeyValue)) {
            selectedRowsSet.add(rowKeyValue);
            newSelectedRows.push(rowKeyValue);
        }
    });
    return newSelectedRows;
}

export const removeDataKeysFromSelectedRows = (selectedRows: any[], data: any[], rowKeyField: string) => {
    const dataKeys = new Set(data.map((d) => getValueByField(d, rowKeyField)));
    return selectedRows.filter((rowKeyValue: any) => !dataKeys.has(rowKeyValue));
}

export const getUpdatedFocused = (props: ITableProps, action: any, funcToUpdate: any) => {
    if (!props?.focused?.cell) return props;
    const newFocused = { cell: funcToUpdate(props.focused.cell, props, action.settings) };
    return { ...props, focused: newFocused };
}
