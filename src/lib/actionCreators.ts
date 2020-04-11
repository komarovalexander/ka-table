import { ActionType } from './enums';

export const updateFilterRowValue = (columnKey: string, filterRowValue: any) => ({
  columnKey,
  filterRowValue,
  type: ActionType.UpdateFilterRowValue,
});

export const updateFilterRowOperator = (columnKey: string, filterRowOperator: string) => ({
  columnKey,
  filterRowOperator,
  type: ActionType.UpdateFilterRowOperator,
});

export const updateEditorValue = (rowKeyValue: any, columnKey: string, value: any) => ({
  columnKey,
  rowKeyValue,
  type: ActionType.UpdateEditorValue,
  value,
});

export const updateCellValue = (rowKeyValue: any, columnKey: string, value: any) => ({
  columnKey,
  rowKeyValue,
  type: ActionType.UpdateCellValue,
  value,
});

export const updateSortDirection = (columnKey: string) => ({
  columnKey,
  type: ActionType.UpdateSortDirection,
});

export const closeEditor = (rowKeyValue: any, columnKey: string) => ({
  columnKey,
  rowKeyValue,
  type: ActionType.CloseEditor,
});

export const deleteRow = (rowKeyValue: any) => ({
  rowKeyValue,
  type: ActionType.DeleteRow,
});

export const deselectAllRows = () => ({
  type: ActionType.DeselectAllRows,
});

export const deselectRow = (rowKeyValue: any) => ({
  rowKeyValue,
  type: ActionType.DeselectRow,
});

export const openEditor = (rowKeyValue: any, columnKey: string) => ({
  columnKey,
  rowKeyValue,
  type: ActionType.OpenEditor,
});

export const search = (searchValue: any) => ({
  search: searchValue,
  type: ActionType.Search,
});

export const selectAllRows = () => ({
  type: ActionType.SelectAllRows,
});

export const selectSingleRow = (rowKeyValue: any) => ({
  rowKeyValue,
  type: ActionType.SelectSingleRow,
});

export const selectRow = (rowKeyValue: any) => ({
  rowKeyValue,
  type: ActionType.SelectRow,
});

export const updateGroupsExpanded = (groupKey: any[]) => ({
  groupKey,
  type: ActionType.UpdateGroupsExpanded,
});

export const updateData = (data: any[]) => ({
  data,
  type: ActionType.UpdateData,
});
