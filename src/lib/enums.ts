
export enum DataType {
  Boolean = 'boolean',
  Date = 'date',
  Number = 'number',
  Object = 'object',
  String = 'string',
}

export enum EditingMode {
  None = 'none',
  Cell = 'cell',
}

export enum ActionType {
  CloseEditor = 'CloseEditor',
  CloseRowEditors = 'CloseRowEditors',
  DeleteRow = 'DeleteRow',
  DeselectAllRows = 'DeselectAllRows',
  DeselectRow = 'DeselectRow',
  HideLoading = 'HideLoading',
  HideNewRow = 'HideNewRow',
  OpenEditor = 'OpenEditor',
  OpenRowEditors = 'OpenRowEditors',
  SaveNewRow = 'SaveNewRow',
  SaveRowEditors = 'SaveRowEditors',
  ScrollTable = 'ScrollTable',
  Search = 'Search',
  SelectAllRows = 'SelectAllRows',
  SelectRow = 'SelectRow',
  SelectSingleRow = 'SelectSingleRow',
  ShowLoading = 'ShowLoading',
  ShowNewRow = 'ShowNewRow',
  UpdateCellValue = 'UpdateCellValue',
  UpdateData = 'UpdateData',
  UpdateEditorValue = 'UpdateEditorValue',
  UpdateFilterRowOperator = 'UpdateFilterRowOperator',
  UpdateFilterRowValue = 'UpdateFilterRowValue',
  UpdateGroupsExpanded = 'UpdateGroupsExpanded',
  UpdatePageIndex = 'UpdatePageIndex',
  UpdateSortDirection = 'UpdateSortDirection',
  UpdateVirtualScrolling = 'UpdateVirtualScrolling',
}

export enum KeyboardEnum {
  Esc = 27,
  Enter = 13,
}

export enum SortDirection {
  Ascend = 'ascend',
  Descend = 'descend',
}

export enum SortingMode {
  None = 'none',
  Single = 'single',
}

export enum FilteringMode {
  None = 'none',
  FilterRow = 'filterRow',
}

export enum FilterOperatorName {
  Equal = '=',
  MoreThan = '>',
  LessThan = '<',
  MoreThanOrEqual = '>=',
  LessThanOrEqual = '<=',
  Contains = 'contains',
  IsEmpty = 'IsEmpty',
  IsNotEmpty = 'IsNotEmpty',
}
