import { ActionType } from './enums';

export const changeFilterRowValue = (columnKey: string, filterRowValue: any) => ({
  columnKey,
  filterRowValue,
  type: ActionType.ChangeFilterRowValue,
});

export const changeFilterRowOperator = (columnKey: string, filterRowOperator: string) => ({
  columnKey,
  filterRowOperator,
  type: ActionType.ChangeFilterRowOperator,
});

export const changeCellValue = (rowKeyValue: any, columnKey: string, value: any) => ({
  columnKey,
  rowKeyValue,
  type: ActionType.ChangeCellValue,
  value,
});

export const changeSortingDirection = (columnKey: string) => ({
  columnKey,
  type: ActionType.ChangeSortingDirection,
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

export const expandGroup = (groupKey: any[]) => ({
  groupKey,
  type: ActionType.ExpandGroup,
});

export const changeData = (data: any[]) => ({
  data,
  type: ActionType.ChangeData,
});
