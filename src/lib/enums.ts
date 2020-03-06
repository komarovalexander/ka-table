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
  ChangeCellValue = 'ChangeCellValue',
  ChangeFilterRowOperator = 'ChangeFilterRowOperator',
  ChangeFilterRowValue = 'ChangeFilterRowValue',
  ChangeSortingDirection = 'ChangeSortingDirection',
  ChangeVirtualScrollingHeightSettings = 'ChangeVirtualScrollingHeightSettings',
  CloseEditor = 'CloseEditor',
  DeleteRow = 'DeleteRow',
  DeselectAllRows = 'DeselectAllRows',
  DeselectRow = 'DeselectRow',
  ExpandGroup = 'ExpandGroup',
  OpenEditor = 'OpenEditor',
  ScrollTable = 'ScrollTable',
  Search = 'Search',
  SelectAllRows = 'SelectAllRows',
  SelectRow = 'SelectRow',
  SelectSingleRow = 'SelectSingleRow',
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
