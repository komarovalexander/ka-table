
export enum PagingPosition {
    Bottom = 'bottom',
    Top = 'top',
    TopAndBottom = 'topAndBottom',
}

export enum DataType {
    // eslint-disable-next-line
    Boolean = 'boolean',
    Date = 'date',
    // eslint-disable-next-line
    Number = 'number',
    Object = 'object',
    // eslint-disable-next-line
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
    ComponentDidMount= 'ComponentDidMount',
    DeleteRow = 'DeleteRow',
    DeselectAllFilteredRows = 'DeselectAllFilteredRows',
    DeselectAllRows = 'DeselectAllRows',
    DeselectAllVisibleRows = 'DeselectAllVisibleRows',
    DeselectRow = 'DeselectRow',
    GroupColumn = 'GroupColumn',
    HideColumn = 'HideColumn',
    HideDetailsRow = 'HideDetailsRow',
    HideLoading = 'HideLoading',
    HideNewRow = 'HideNewRow',
    InsertRow = 'InsertRow',
    LoadData = 'LoadData',
    InsertColumn = 'InsertColumn',
    MoveColumnBefore = 'MoveColumnBefore',
    MoveColumnToIndex = 'MoveColumnToIndex',
    MoveFocusedDown = 'MoveFocusedDown',
    MoveFocusedLeft = 'MoveFocusedLeft',
    MoveFocusedRight = 'MoveFocusedRight',
    MoveFocusedUp = 'MoveFocusedUp',
    OpenAllEditors = 'OpenAllEditors',
    OpenEditor = 'OpenEditor',
    OpenRowEditors = 'OpenRowEditors',
    ReorderColumns = 'ReorderColumns',
    ReorderRows = 'ReorderRows',
    ResizeColumn = 'ResizeColumn',
    SaveAllEditors = 'SaveAllEditors',
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
    UngroupColumn = 'UngroupColumn',
    UpdateCellValue = 'UpdateCellValue',
    UpdateData = 'UpdateData',
    UpdateEditorValue = 'UpdateEditorValue',
    UpdateFilterRowOperator = 'UpdateFilterRowOperator',
    UpdateFilterRowValue = 'UpdateFilterRowValue',
    UpdateGroupsExpanded = 'UpdateGroupsExpanded',
    UpdateHeaderFilterValues = 'UpdateHeaderFilterValues',
    UpdateHeaderFilterPopupState = 'UpdateHeaderFilterPopupState',
    UpdatePopupPosition = 'UpdatePopupPosition',
    UpdatePageIndex = 'UpdatePageIndex',
    UpdatePageSize = 'UpdatePageSize',
    UpdatePagesCount = 'UpdatePagesCount',
    UpdateRow = 'UpdateRow',
    UpdateSortDirection = 'UpdateSortDirection',
    UpdateTreeGroupsExpanded = 'UpdateTreeGroupsExpanded',
    UpdateVirtualScrolling = 'UpdateVirtualScrolling',
    Validate = 'Validate'
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

export enum InsertRowPosition {
    before = 'before',
    after = 'after'
}
