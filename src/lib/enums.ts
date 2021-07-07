
export enum PagingPosition {
  Bottom = 'bottom',
  Top = 'top',
  TopAndBottom = 'topAndBottom',
}

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
  ClearFocused = 'ClearFocused',
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
  MoveFocusedDown = 'MoveFocusedDown',
  MoveFocusedLeft = 'MoveFocusedLeft',
  MoveFocusedRight = 'MoveFocusedRight',
  MoveFocusedUp = 'MoveFocusedUp',
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
  SetFocused = 'SetFocused',
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
  UpdateHeaderFilterPopupState = 'UpdateHeaderFilterPopupState',
  UpdatePageIndex = 'UpdatePageIndex',
  UpdatePageSize = 'UpdatePageSize',
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
  HeaderFilter = 'headerFilter',
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
