import { newRowId } from '../const';
import { ActionType } from '../enums';
import { ITableProps } from '../index';
import { Column } from '../models';
import { EditableCell } from '../Models/EditableCell';
import { ILoadingProps } from '../props';
import { kaPropsUtils } from '../utils';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../Utils/ArrayUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from '../Utils/CellUtils';
import { getValueByField, replaceValue } from '../Utils/DataUtils';
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

const kaReducer: any = (props: ITableProps, action: any) => {
  const {
    columns,
    data = [],
    detailsRows = [],
    editableCells = [],
    groupsExpanded,
    loading,
    paging,
    rowKeyField,
    selectedRows = [],
    validation,
    virtualScrolling,
  } = props;

  switch (action.type) {
    case ActionType.ReorderRows: {
      const movedRow = data.find(d => getValueByField(d, rowKeyField) === action.rowKeyValue);
      const newData = data.filter(d => getValueByField(d, rowKeyField) !== getValueByField(movedRow, rowKeyField));
      const targetRowIndex = data.findIndex(d => getValueByField(d, rowKeyField) === action.targetRowKeyValue);
      newData.splice(targetRowIndex, 0, movedRow)
      return {...props, data: newData};
    }
    case ActionType.ResizeColumn: {
      const { columnKey, width } = action;

      const column = columns.find((c: Column) => c.key === columnKey)!;
      const newColumn: Column = {
        ...column,
        style: { ...column.style, width },
      };
      const newColumns = getCopyOfArrayAndInsertOrReplaceItem(
        newColumn,
        'key',
        columns,
      );
      return { ...props, columns: newColumns };
    }
    case ActionType.UpdatePageIndex: {
      return { ...props, paging: {...paging, pageIndex: action.pageIndex } };
    }
    case ActionType.UpdatePagesCount: {
      return { ...props, paging: {...paging, pagesCount: action.pagesCount }};
    }
    case ActionType.HideLoading: {
      return { ...props, loading: {...loading, enabled: false } };
    }
    case ActionType.ShowLoading: {
      const newLoading: ILoadingProps = {...loading, enabled: true };
      if (action.text !== undefined) {
        newLoading.text = action.text;
      }
      return { ...props, loading: newLoading };
    }
    case ActionType.ShowDetailsRow: {
      const newDetailsRows = [...detailsRows];
      newDetailsRows.push(action.rowKeyValue);
      return { ...props, detailsRows: newDetailsRows };
    }
    case ActionType.HideDetailsRow: {
      const newDetailsRows = detailsRows.filter(row => row !== action.rowKeyValue);
      return { ...props, detailsRows: newDetailsRows };
    }
    case ActionType.OpenEditor: {
      const newEditableCells = addItemToEditableCells(
        action,
        editableCells);
      return { ...props, editableCells: newEditableCells };
    }
    case ActionType.CloseEditor: {
      const newEditableCells = removeItemFromEditableCells(
        action,
        editableCells);
      return { ...props, editableCells: newEditableCells };
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
      return { ...props, columns: newColumns };
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
      return { ...props, columns: newColumns };
    }
    case ActionType.UpdateEditorValue: {
      const newEditableCells = [...editableCells];
      const editableCellIndex = newEditableCells.findIndex((c) => c.columnKey === action.columnKey && c.rowKeyValue === action.rowKeyValue);
      const editableCell = { ...newEditableCells[editableCellIndex], editorValue: action.value };
      newEditableCells[editableCellIndex] = editableCell;
      return { ...props, editableCells: newEditableCells };
    }
    case ActionType.UpdateCellValue: {
      const row = data.find((d) => getValueByField(d, rowKeyField) === action.rowKeyValue);
      const column = columns.find((c) => c.key === action.columnKey)!;
      const updatedRowData = replaceValue(row, column, action.value);
      const newData = getCopyOfArrayAndInsertOrReplaceItem(updatedRowData, rowKeyField, data);
      return { ...props, data: newData };
    }
    case ActionType.DeleteRow: {
      const newData = data.filter(
        (d: any) => getValueByField(d, rowKeyField) !== action.rowKeyValue);
      return { ...props, data: newData };
    }
    case ActionType.SelectAllRows: {
      const newSelectedRows = data.map((d) => getValueByField(d, rowKeyField));
      return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.Search: {
      return { ...props, searchText: action.searchText };
    }
    case ActionType.SelectSingleRow: {
      const newSelectedRows = [action.rowKeyValue];
      return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectAllRows:
      return { ...props, selectedRows: [] };
    case ActionType.SelectRow:
        return { ...props, selectedRows: [...selectedRows, ...[action.rowKeyValue]] };
    case ActionType.SelectRowsRange: {
      const rowKeyValueTo = action.rowKeyValueTo;
      if (rowKeyValueTo) {
        const shownData = kaPropsUtils.getData(props);
        const rowKeyValueToIndex = shownData.findIndex(d => getValueByField(d, rowKeyField) === rowKeyValueTo);
        const rowKeyValueFromIndex = shownData.findIndex(d => getValueByField(d, rowKeyField) === action.rowKeyValueFrom);
        if (rowKeyValueToIndex != null && rowKeyValueFromIndex != null){
          const [start, end] = rowKeyValueToIndex > rowKeyValueFromIndex ? [rowKeyValueFromIndex, rowKeyValueToIndex] : [rowKeyValueToIndex, rowKeyValueFromIndex];
          const rowsToSelect = [];
          for (let i = start; i <= end; i++){
            const value = getValueByField(shownData[i], rowKeyField);
            if (!selectedRows.includes(value)){
              rowsToSelect.push(value);
            }
          }
          return { ...props, selectedRows: [...selectedRows, ...rowsToSelect] };
        }
      }
      return { ...props, selectedRows: [...selectedRows, ...[action.rowKeyValueFrom]] };
    }
    case ActionType.DeselectRow: {
      const newSelectedRows = [...selectedRows].filter((s) => s !== action.rowKeyValue);
      return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.UpdateSortDirection:
      const sortedColumns = getSortedColumns(columns, action.columnKey);
      return { ...props, columns: sortedColumns };
    case ActionType.UpdateVirtualScrolling:
      return { ...props, virtualScrolling: action.virtualScrolling };
    case ActionType.UpdateData:
      return { ...props, data: action.data };
    case ActionType.ScrollTable:
      if (virtualScrolling) {
          const scrollTop = action.scrollTop;
          return {...props, ...{virtualScrolling: { ...virtualScrolling, scrollTop }}};
        }
      break;
    case ActionType.UpdateGroupsExpanded: {
      let currentGroupsExpanded = groupsExpanded;
      if (!currentGroupsExpanded) {
        const preparedOptions = prepareTableOptions(props);
        currentGroupsExpanded = getExpandedGroups(preparedOptions.groupedData);
      }
      const newGroupsExpanded = updateExpandedGroups(
        currentGroupsExpanded,
        action.groupKey,
      );
      return { ...props, groupsExpanded: newGroupsExpanded };
    }
    case ActionType.ShowNewRow:
    case ActionType.OpenRowEditors: {
      const rowKeyValue = action.type === ActionType.ShowNewRow ? newRowId : action.rowKeyValue;
      const newEditableCells = addColumnsToRowEditableCells(editableCells, columns, rowKeyValue);
      return { ...props, editableCells: newEditableCells };
    }
    case ActionType.HideNewRow:
    case ActionType.CloseRowEditors: {
      const rowKeyValue = action.type === ActionType.HideNewRow ? newRowId : action.rowKeyValue;
      const newEditableCells = editableCells.filter(e => e.rowKeyValue !== rowKeyValue);
      return { ...props, editableCells: newEditableCells };
    }
    case ActionType.SaveRowEditors:
    case ActionType.SaveNewRow: {
      const isNewRow = action.type === ActionType.SaveNewRow;
      const rowEditorKeyValue = isNewRow ? newRowId : action.rowKeyValue;
      let updatedRowData = data.find((d) => getValueByField(d, rowKeyField) === rowEditorKeyValue);
      const rowEditableCells = editableCells.filter(
        editableCell => editableCell.rowKeyValue === rowEditorKeyValue
        && (isNewRow || editableCell.hasOwnProperty('editorValue')));
      if (action.validate) {
        let validationPassed = true;
        rowEditableCells.forEach(cell => {
          const column = columns.find((c) => c.key === cell.columnKey)!;
          cell.validationMessage = validation && validation({
            column,
            value: cell.editorValue,
            rowData: updatedRowData
          });
          validationPassed = validationPassed && !cell.validationMessage;
        });
        if (!validationPassed){
          return { ...props, editableCells: [...editableCells] };
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
      return { ...props, data: newData, editableCells: newEditableCells };
    }
    case ActionType.UpdateRow: {
      const newData = getCopyOfArrayAndInsertOrReplaceItem(action.rowData, rowKeyField, data);
      return { ...props, data: newData };
    }
  }
  return props;
};

export {
  kaReducer,
};
