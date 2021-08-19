import { ITableProps } from '../';
import { Column, EditableCell } from '../models';
import { ValidationFunc } from '../types';
import { getValueByField } from './DataUtils';

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
}) : EditableCell[] => {
  return editableCells.map(cell => {
    const column = columns.find((c) => c.key === cell.columnKey)!;
    const updatedRowData = data?.find((d) => getValueByField(d, rowKeyField) === cell.rowKeyValue);
    const value = cell.hasOwnProperty('editorValue') ? cell.editorValue : getValueByField(updatedRowData, cell.columnKey);
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
      editableCells.push({ columnKey: column.key, rowKeyValue });
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

export const removeDataKeysFromSelectedRows = (selectedRows: any[], data: any[], rowKeyField: string) => {
  const newSelectedRows = selectedRows.filter((rowKeyValue: any) =>
    !data.some(d => getValueByField(d, rowKeyField) === rowKeyValue));
  return newSelectedRows;
}

export const getUpdatedFocused = (props: ITableProps, action: any, funcToUpdate: any) => {
  if (!props?.focused?.cell) return props;
  const newFocused = { cell: funcToUpdate(props.focused.cell, props, action.settings) };
  return { ...props, focused: newFocused };
}
