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

export enum Events {
  CloseEditor = 'CloseEditor',
  FilterRowChanged = 'FilterRowChanged',
  OpenEditor = 'OpenEditor',
  RowDataChanged = 'RowDataChanged',
  RowDeselected = 'RowDeselected',
  RowSelected = 'RowSelected',
  ScrollTable = 'ScrollTable',
  SortingChanged = 'SortingChanged',
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
  FilterRow = 'FilterRow',
}
