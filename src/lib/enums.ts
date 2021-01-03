
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
  ClearSingleAction = 'ClearSingleAction',
  CloseEditor = 'CloseEditor',
  CloseRowEditors = 'CloseRowEditors',
  DeleteRow = 'DeleteRow',
  DeselectAllFilteredRows = 'DeselectAllFilteredRows',
  DeselectAllRows = 'DeselectAllRows',
  DeselectAllVisibleRows = 'DeselectAllVisibleRows',
  DeselectRow = 'DeselectRow',
  HideColumn = 'HideColumn',
  HideDetailsRow = 'HideDetailsRow',
  HideLoading = 'HideLoading',
  HideNewRow = 'HideNewRow',
  LoadData = 'LoadData',
  OpenEditor = 'OpenEditor',
  OpenRowEditors = 'OpenRowEditors',
  ReorderColumns = 'ReorderColumns',
  ReorderRows = 'ReorderRows',
  ResizeColumn = 'ResizeColumn',
  SaveNewRow = 'SaveNewRow',
  SaveRowEditors = 'SaveRowEditors',
  ScrollTable = 'ScrollTable',
  Search = 'Search',
  SelectAllFilteredRows = 'SelectAllFilteredRows',
  SelectAllRows = 'SelectAllRows',
  SelectAllVisibleRows = 'SelectAllVisibleRows',
  SelectRow = 'SelectRow',
  SelectRowsRange = 'SelectRowsRange',
  SelectSingleRow = 'SelectSingleRow',
  SetSingleAction = 'SetSingleAction',
  ShowColumn = 'ShowColumn',
  ShowDetailsRow = 'ShowDetailsRow',
  ShowLoading = 'ShowLoading',
  ShowNewRow = 'ShowNewRow',
  UpdateCellValue = 'UpdateCellValue',
  UpdateData = 'UpdateData',
  UpdateEditorValue = 'UpdateEditorValue',
  UpdateFilterRowOperator = 'UpdateFilterRowOperator',
  UpdateFilterRowValue = 'UpdateFilterRowValue',
  UpdateGroupsExpanded = 'UpdateGroupsExpanded',
  UpdatePageIndex = 'UpdatePageIndex',
  UpdatePagesCount = 'UpdatePagesCount',
  UpdateRow = 'UpdateRow',
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
  SingleTripleState = 'singleTripleState',
  SingleRemote = 'singleRemote',
  SingleTripleStateRemote = 'singleTripleStateRemote',
  MultipleRemote = 'multipleRemote',
  MultipleTripleStateRemote = 'multipleTripleStateRemote',
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
