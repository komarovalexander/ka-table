import { ITableProps } from '../';
import { Column, EditableCell } from '../models';
import { ValidationFunc } from '../types';
import { getValueByColumn, getValueByField } from './DataUtils';

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
    return editableCells.map(cell => {
        const column = columns.find((c) => c.key === cell.columnKey)!;
        const updatedRowData = data?.find((d) => getValueByField(d, rowKeyField) === cell.rowKeyValue);
        let value = cell.editorValue;
        if (!Object.prototype.hasOwnProperty.call(cell, 'editorValue')) {
            value = column ? getValueByColumn(updatedRowData, column) : getValueByField(updatedRowData, cell.columnKey);
        }
        return {
            ...cell,
            validationMessage: validation && validation({
                column,
                rowData: updatedRowData,
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
