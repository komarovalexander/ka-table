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
  ScrollTable = 'ScrollTable',
  CloseEditor = 'CloseEditor',
  OpenEditor = 'OpenEditor',
  RowDataChanged = 'RowDataChanged',
  RowDeselected = 'RowDeselected',
  RowSelected = 'RowSelected',
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
