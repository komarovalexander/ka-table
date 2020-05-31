import { newRowId } from '../const';
import { ActionType } from '../enums';
import { ITableProps } from '../index';
import { Column } from '../models';
import { EditableCell } from '../Models/EditableCell';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../Utils/ArrayUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from '../Utils/CellUtils';
import { replaceValue } from '../Utils/DataUtils';
import { getExpandedGroups, updateExpandedGroups } from '../Utils/GroupUtils';
import { getSortedColumns } from '../Utils/HeadRowUtils';
import { prepareTableOptions } from '../Utils/PropsUtils';

const addColumnsToRowEditableCells = (editableCells: EditableCell[], columns: Column[], rowKeyValue: any) => {
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

const kaReducer: any = (state: ITableProps, action: any) => {
  const {
    columns,
    data = [],
    editableCells = [],
    groupsExpanded,
    detailsRows = [],
    loading,
    paging,
    rowKeyField,
    selectedRows = [],
    virtualScrolling,
  } = state;

  switch (action.type) {
    case ActionType.UpdatePageIndex: {
      return { ...state, paging: {...paging, pageIndex: action.pageIndex } };
    }
    case ActionType.UpdatePagesCount: {
      return { ...state, paging: {...paging, pagesCount: action.pagesCount }};
    }
    case ActionType.HideLoading: {
      return { ...state, loading: {...loading, enabled: false } };
    }
    case ActionType.ShowLoading: {
      const newLoading = {...loading, enabled: true };
      if (action.text !== undefined) {
        newLoading.text = action.text;
      }
      return { ...state, loading: newLoading };
    }
    case ActionType.ShowDetailsRow: {
      const newDetailsRows = [...detailsRows];
      newDetailsRows.push(action.rowKeyValue);
      return { ...state, detailsRows: newDetailsRows };
    }
    case ActionType.HideDetailsRow: {
      const newDetailsRows = detailsRows.filter(row => row !== action.rowKeyValue);
      return { ...state, detailsRows: newDetailsRows };
    }
    case ActionType.OpenEditor: {
      const newEditableCells = addItemToEditableCells(
        action,
        editableCells);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.CloseEditor: {
      const newEditableCells = removeItemFromEditableCells(
        action,
        editableCells);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.UpdateFilterRowValue: {
      const column = columns.find((c: Column) => c.key === action.columnKey)!;
      const newColumn: Column = {
        ...column,
        filterRowValue: action.filterRowValue,
      };
      const newColumns = getCopyOfArrayAndInsertOrReplaceItem(
        newColumn,
        'key',
        columns,
      );
      return { ...state, columns: newColumns };
    }
    case ActionType.UpdateFilterRowOperator: {
      const column = columns.find((c: Column) => c.key === action.columnKey)!;
      const newColumn: Column = {
        ...column,
        filterRowOperator: action.filterRowOperator,
      };
      const newColumns = getCopyOfArrayAndInsertOrReplaceItem(
        newColumn,
        'key',
        columns,
      );
      return { ...state, columns: newColumns };
    }
    case ActionType.UpdateEditorValue: {
      const newEditableCells = [...editableCells];
      const editableCellIndex = newEditableCells.findIndex((c) => c.columnKey === action.columnKey && c.rowKeyValue === action.rowKeyValue);
      const editableCell = { ...newEditableCells[editableCellIndex], editorValue: action.value };
      newEditableCells[editableCellIndex] = editableCell;
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.UpdateCellValue: {
      const row = data.find((d) => d[rowKeyField] === action.rowKeyValue);
      const column = columns.find((c) => c.key === action.columnKey)!;
      const updatedRowData = replaceValue(row, column, action.value);
      const newData = getCopyOfArrayAndInsertOrReplaceItem(updatedRowData, rowKeyField, data);
      return { ...state, data: newData };
    }
    case ActionType.DeleteRow: {
      const newData = data.filter(
        (d: any) => d[rowKeyField] !== action.rowKeyValue);
      return { ...state, data: newData };
    }
    case ActionType.SelectAllRows: {
      const newSelectedRows = data.map((d) => d[rowKeyField]);
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.Search: {
      return { ...state, search: action.search };
    }
    case ActionType.SelectSingleRow: {
      const newSelectedRows = [action.rowKeyValue];
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectAllRows:
      return { ...state, selectedRows: [] };
    case ActionType.SelectRow:
        return { ...state, selectedRows: [...selectedRows, ...[action.rowKeyValue]] };
    case ActionType.DeselectRow: {
      const newSelectedRows = [...selectedRows].filter((s) => s !== action.rowKeyValue);
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.UpdateSortDirection:
      const sortedColumns = getSortedColumns(columns, action.columnKey);
      return { ...state, columns: sortedColumns };
    case ActionType.UpdateVirtualScrolling:
      return { ...state, virtualScrolling: action.virtualScrolling };
    case ActionType.UpdateData:
      return { ...state, data: action.data };
    case ActionType.ScrollTable:
      if (virtualScrolling) {
          const scrollTop = action.scrollTop;
          return {...state, ...{virtualScrolling: { ...virtualScrolling, scrollTop }}};
        }
      break;
    case ActionType.UpdateGroupsExpanded: {
      let currentGroupsExpanded = groupsExpanded;
      if (!currentGroupsExpanded) {
        const preparedOptions = prepareTableOptions(state);
        currentGroupsExpanded = getExpandedGroups(preparedOptions.groupedData);
      }
      const newGroupsExpanded = updateExpandedGroups(
        currentGroupsExpanded,
        action.groupKey,
      );
      return { ...state, groupsExpanded: newGroupsExpanded };
    }
    case ActionType.ShowNewRow:
    case ActionType.OpenRowEditors: {
      const rowKeyValue = action.type === ActionType.ShowNewRow ? newRowId : action.rowKeyValue;
      const newEditableCells = addColumnsToRowEditableCells(editableCells, columns, rowKeyValue);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.HideNewRow:
    case ActionType.CloseRowEditors: {
      const rowKeyValue = action.type === ActionType.HideNewRow ? newRowId : action.rowKeyValue;
      const newEditableCells = editableCells.filter(e => e.rowKeyValue !== rowKeyValue);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.SaveRowEditors:
    case ActionType.SaveNewRow: {
      const isNewRow = action.type === ActionType.SaveNewRow;
      const rowEditorKeyValue = isNewRow ? newRowId : action.rowKeyValue;
      let updatedRowData = data.find((d) => d[rowKeyField] === rowEditorKeyValue);
      const rowEditableCells = editableCells.filter(
        editableCell => editableCell.rowKeyValue === rowEditorKeyValue
        && (isNewRow || editableCell.hasOwnProperty('editorValue')));
      if (action.validate) {
        let validationPassed = true;
        rowEditableCells.forEach(cell => {
          const column = columns.find((c) => c.key === cell.columnKey)!;
          cell.validationMessage = column.validation && column.validation(cell.editorValue);
          validationPassed = validationPassed && !cell.validationMessage;
        });
        if (!validationPassed){
          return { ...state, editableCells: [...editableCells] };
        }
      }
      const newEditableCells = editableCells.filter(e => e.rowKeyValue !== rowEditorKeyValue);
      rowEditableCells.forEach(cell => {
        const column = columns.find((c) => c.key === cell.columnKey)!;
        updatedRowData = replaceValue(updatedRowData, column, cell.editorValue);
      });
      let newData;
      if (isNewRow) {
        updatedRowData[rowKeyField] = action.rowKeyValue;
        newData = [updatedRowData, ...data];
      } else {
        newData = getCopyOfArrayAndInsertOrReplaceItem(updatedRowData, rowKeyField, data);
      }
      return { ...state, data: newData, editableCells: newEditableCells };
    }
    case ActionType.UpdateRow: {
      const newData = getCopyOfArrayAndInsertOrReplaceItem(action.rowData, rowKeyField, data);
      return { ...state, data: newData };
    }
  }
  return state;
};

export {
  kaReducer,
};
