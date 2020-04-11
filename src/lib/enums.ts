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
  DeleteRow = 'DeleteRow',
  DeselectAllRows = 'DeselectAllRows',
  DeselectRow = 'DeselectRow',
  OpenEditor = 'OpenEditor',
  ScrollTable = 'ScrollTable',
  Search = 'Search',
  SelectAllRows = 'SelectAllRows',
  SelectRow = 'SelectRow',
  SelectSingleRow = 'SelectSingleRow',
  UpdateEditorValue = 'UpdateEditorValue',
  UpdateCellValue = 'UpdateCellValue',
  UpdateData = 'UpdateData',
  UpdateFilterRowOperator = 'UpdateFilterRowOperator',
  UpdateFilterRowValue = 'UpdateFilterRowValue',
  UpdateGroupsExpanded = 'UpdateGroupsExpanded',
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
