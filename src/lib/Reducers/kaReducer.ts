import { newRowId } from '../const';
import { ActionType, SortingMode } from '../enums';
import { ITableProps } from '../index';
import { Column } from '../models';
import { EditableCell } from '../Models/EditableCell';
import { ILoadingProps } from '../props';
import { kaPropsUtils } from '../utils';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../Utils/ArrayUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from '../Utils/CellUtils';
import { getValueByField, reorderData, replaceValue } from '../Utils/DataUtils';
import { filterAndSearchData } from '../Utils/FilterUtils';
import { getExpandedGroups, updateExpandedGroups } from '../Utils/GroupUtils';
import { getUpdatedSortedColumns } from '../Utils/HeadRowUtils';
import { getDownCell, getLeftCell, getRightCell, getUpCell } from '../Utils/NavigationUtils';
import { getData, prepareTableOptions } from '../Utils/PropsUtils';
import { getExpandedParents } from '../Utils/TreeUtils';

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

const removeDataKeysFromSelectedRows = (selectedRows: any[], data: any[], rowKeyField: string) => {
  const newSelectedRows = selectedRows.filter((rowKeyValue: any) =>
    !data.some(d => getValueByField(d, rowKeyField) === rowKeyValue));
  return newSelectedRows;
}

const getUpdatedFocused = (props: ITableProps, action: any, funcToUpdate: any) => {
  if (!props?.focused?.cell) return props;
  const newFocused = { cell: funcToUpdate(props.focused.cell, props, action.settings)};
  return { ...props, focused: newFocused };
}

const kaReducer: any = (props: ITableProps, action: any): ITableProps => {
  const {
    columns,
    data = [],
    detailsRows = [],
    editableCells = [],
    groupsExpanded,
    loading,
    paging,
    treeGroupsExpanded,
    rowKeyField,
    selectedRows = [],
    validation,
    sortingMode = SortingMode.None,
    virtualScrolling,
  } = props;

  switch (action.type) {
    case ActionType.MoveFocusedRight: {
      return getUpdatedFocused(props, action, getRightCell);
    }
    case ActionType.MoveFocusedLeft: {
      return getUpdatedFocused(props, action, getLeftCell);
    }
    case ActionType.MoveFocusedUp: {
      return getUpdatedFocused(props, action, getUpCell);
    }
    case ActionType.MoveFocusedDown: {
      return getUpdatedFocused(props, action, getDownCell);
    }
    case ActionType.SetFocused: {
      return { ...props, focused: action.focused };
    }
    case ActionType.ClearFocused : {
      return { ...props, focused: undefined };
    }
    case ActionType.ClearSingleAction: {
      return {...props, singleAction: undefined };
    }
    case ActionType.SetSingleAction: {
      return {...props, singleAction: action.singleAction };
    }
    case ActionType.ShowColumn: {
      const newColumns = [...columns];
      const columnIndex = newColumns.findIndex(c => c.key === action.columnKey);
      newColumns[columnIndex] = {...newColumns[columnIndex], visible: true};
      return {...props, columns: newColumns};
    }
    case ActionType.HideColumn: {
      const newColumns = [...columns];
      const columnIndex = newColumns.findIndex(c => c.key === action.columnKey);
      newColumns[columnIndex] = {...newColumns[columnIndex], visible: false};
      return {...props, columns: newColumns};
    }
    case ActionType.ReorderRows: {
      const newData = reorderData(data, (d) => getValueByField(d, rowKeyField), action.rowKeyValue, action.targetRowKeyValue);
      return {...props, data: newData};
    }
    case ActionType.ReorderColumns: {
      const newData = reorderData(columns, (d) => d.key, action.columnKey, action.targetColumnKey);
      return {...props, columns: newData};
    }
    case ActionType.ResizeColumn: {
      const { columnKey, width } = action;
      const newColumns = columns.map((column: Column) => {
        if (column.key === columnKey) {
          const newColumn = {
            ...column,
          };
          if (newColumn.style?.width != null){
            newColumn.style = { ...newColumn.style, width };
          }
          if (newColumn.style?.width == null || newColumn.width != null) {
            newColumn.width = width;
          }
          if (newColumn.colGroup?.style?.width != null){
            newColumn.colGroup.style =  { ...newColumn.colGroup.style, width };
          }
          if (newColumn.colGroup?.width != null){
            newColumn.colGroup.width = width;
          }
          return newColumn;
        }
        return column;
    });
      return { ...props, columns: newColumns };
    }
    case ActionType.UpdatePageIndex: {
      return { ...props, paging: {...paging, pageIndex: action.pageIndex } };
    }
    case ActionType.UpdatePageSize: {
      return { ...props, paging: {...paging, pageSize: action.pageSize } };
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
    case ActionType.SelectAllFilteredRows: {
      const newData = filterAndSearchData(props);
      let newSelectedRows = removeDataKeysFromSelectedRows(selectedRows, newData, rowKeyField);
      newSelectedRows = [...newSelectedRows, ...newData.map((d) => getValueByField(d, rowKeyField))];
      return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.SelectAllVisibleRows: {
      const newData = getData(props);
      let newSelectedRows = removeDataKeysFromSelectedRows(selectedRows, newData, rowKeyField);
      newSelectedRows = [...newSelectedRows, ...newData.map((d) => getValueByField(d, rowKeyField))];
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
    case ActionType.DeselectAllFilteredRows: {
      const newData = filterAndSearchData(props);
      const newSelectedRows = removeDataKeysFromSelectedRows(selectedRows, newData, rowKeyField);
      return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectAllVisibleRows: {
      const newData = getData(props);
      const newSelectedRows = removeDataKeysFromSelectedRows(selectedRows, newData, rowKeyField);
      return { ...props, selectedRows: newSelectedRows };
    }
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
      const sortedColumns = getUpdatedSortedColumns(columns, action.columnKey, sortingMode);
      return { ...props, columns: sortedColumns };
    case ActionType.UpdateVirtualScrolling:
      return { ...props, virtualScrolling: action.virtualScrolling };
    case ActionType.UpdateData:
      return { ...props, data: action.data };
    case ActionType.ScrollTable:
      const scrollTop = action.scrollTop;
      return {...props, ...{virtualScrolling: { ...virtualScrolling, scrollTop }}};
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
    case ActionType.OpenAllEditors: {
      const newEditableCells = getEditableCellsByData(data, rowKeyField, columns);
      return { ...props, editableCells: newEditableCells };
    }
    case ActionType.HideNewRow:
    case ActionType.CloseRowEditors: {
      const rowKeyValue = action.type === ActionType.HideNewRow ? newRowId : action.rowKeyValue;
      const newEditableCells = editableCells.filter(e => e.rowKeyValue !== rowKeyValue);
      return { ...props, editableCells: newEditableCells };
    }
    case ActionType.Validate: {
      const newEditableCells = editableCells.map(cell => {
        const column = columns.find((c) => c.key === cell.columnKey)!;
        const updatedRowData = data.find((d) => getValueByField(d, rowKeyField) === cell.rowKeyValue);
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
      return { ...props, editableCells: [...newEditableCells] };
    }
    case ActionType.SaveEditors: {
      const newData = [...data];
      editableCells?.forEach(editableCell => {
        if (editableCell.hasOwnProperty('editorValue')){
          const rowIndex = newData.findIndex((d) => getValueByField(d, rowKeyField) === editableCell.rowKeyValue);
          if (rowIndex != null){
            const column = columns.find((c) => c.key === editableCell.columnKey)!;
            newData[rowIndex] = replaceValue(newData[rowIndex], column, editableCell.editorValue);
          }
        }
      });
      return { ...props, data: newData };
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
    case ActionType.UpdateTreeGroupsExpanded: {
      const rowKeyValue = action.rowKeyValue;
      const value = treeGroupsExpanded ? !treeGroupsExpanded.some(v => v === rowKeyValue) : false;
      if (value){
        return { ...props, treeGroupsExpanded: [...(treeGroupsExpanded || []), rowKeyValue] };
      }
      let currentExpanded = treeGroupsExpanded;
      if (!currentExpanded){
        const preparedOptions = prepareTableOptions(props);
        currentExpanded = getExpandedParents(preparedOptions.groupedData, rowKeyField);
      }
      return { ...props, treeGroupsExpanded: currentExpanded.filter(item => item !== rowKeyValue) };
    }
  }
  return props;
};

export {
  kaReducer,
};
