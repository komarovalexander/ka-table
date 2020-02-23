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
  ChangeFilterRow = 'ChangeFilterRow',
  ChangeRowData = 'ChangeRowData',
  ChangeSorting = 'ChangeSorting',
  ChangeVirtualScrollingHeightSettings = 'ChangeVirtualScrollingHeightSettings',
  CloseEditor = 'CloseEditor',
  DeselectAllRows = 'DeselectAllRows',
  DeselectRow = 'DeselectRow',
  DeselectRowData = 'DeselectRowData',
  OpenEditor = 'OpenEditor',
  ScrollTable = 'ScrollTable',
  SelectAllRows = 'SelectAllRows',
  SelectSingleRow = 'SelectSingleRow',
  SelectRow = 'SelectRow',
  UpdateGroupsExpanded = 'UpdateGroupsExpanded',
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
