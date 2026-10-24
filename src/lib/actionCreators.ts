import { ActionType, InsertRowPosition } from './enums';
import { CustomAction } from './types';

import { Column } from './Models/Column';
import { Focused } from './Models/Focused';
import { IMoveFocusedSettings } from './Utils/NavigationUtils';
import { PopupPosition } from './Models/PopupPosition';

export const updateHeaderFilterValues = (columnKey: string, item: string, checked: boolean) => ({
    columnKey,
    checked,
    item,
    type: ActionType.UpdateHeaderFilterValues as const
});

export const updatePopupPosition = (popupPosition: PopupPosition) => ({
    popupPosition,
    type: ActionType.UpdatePopupPosition as const
});

export const updateHeaderFilterPopupState = (columnKey: string, isHeaderFilterPopupShown?: boolean) => ({
    columnKey,
    isHeaderFilterPopupShown,
    type: ActionType.UpdateHeaderFilterPopupState as const
});

export const updateFilterRowValue = (columnKey: string, filterRowValue: unknown) => ({
    columnKey,
    filterRowValue,
    type: ActionType.UpdateFilterRowValue as const,
});

export const updateHeaderFilterSearchValue = (columnKey: string, headerFilterSearchValue: string) => ({
    columnKey,
    headerFilterSearchValue,
    type: ActionType.UpdateHeaderFilterSearchValue as const,
});

export const updateFilterRowOperator = (columnKey: string, filterRowOperator: string) => ({
    columnKey,
    filterRowOperator,
    type: ActionType.UpdateFilterRowOperator as const,
});

export const clearAllFilters = () => ({
    type: ActionType.ClearAllFilters as const,
});

export const updateEditorValue = (rowKeyValue: unknown, columnKey: string, value: unknown) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.UpdateEditorValue as const,
    value
});

export const updateCellValue = (rowKeyValue: unknown, columnKey: string, value: unknown) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.UpdateCellValue as const,
    value
});

export const updateSortDirection = (columnKey: string) => ({
    columnKey,
    type: ActionType.UpdateSortDirection as const,
});

export const closeEditor = (rowKeyValue: unknown, columnKey: string) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.CloseEditor as const,
});

export const deleteRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.DeleteRow as const,
});

export const deselectAllRows = () => ({
    type: ActionType.DeselectAllRows as const,
});

export const deselectAllFilteredRows = () => ({
    type: ActionType.DeselectAllFilteredRows as const,
});

export const deselectAllVisibleRows = () => ({
    type: ActionType.DeselectAllVisibleRows as const,
});

export const deselectRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.DeselectRow as const,
});

export const deselectRows = (rowsKeyValues: unknown[]) => ({
    rowsKeyValues,
    type: ActionType.DeselectRows as const,
});

export const openEditor = (rowKeyValue: unknown, columnKey: string) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.OpenEditor as const,
});

export const search = (searchText: string) => ({
    searchText,
    type: ActionType.Search as const,
});

export const selectAllRows = () => ({
    type: ActionType.SelectAllRows as const,
});

export const selectAllFilteredRows = () => ({
    type: ActionType.SelectAllFilteredRows as const,
});

export const selectAllVisibleRows = () => ({
    type: ActionType.SelectAllVisibleRows as const,
});

export const selectSingleRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.SelectSingleRow as const,
});

export const selectRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.SelectRow as const,
});

export const selectRows = (rowsKeyValues: unknown[]) => ({
    rowsKeyValues,
    type: ActionType.SelectRows as const,
});

export const selectRowsRange = (rowKeyValueFrom: unknown, rowKeyValueTo: unknown) => ({
    rowKeyValueFrom,
    rowKeyValueTo,
    type: ActionType.SelectRowsRange as const,
});

export const updateGroupsExpanded = (groupKey: unknown[]) => ({
    groupKey,
    type: ActionType.UpdateGroupsExpanded as const,
});

export const updateData = (data: unknown[]) => ({
    data,
    type: ActionType.UpdateData as const,
});

export const showLoading = (text?: string) => ({
    text,
    type: ActionType.ShowLoading as const,
});

export const hideLoading = () => ({
    type: ActionType.HideLoading as const,
});

export const showNewRow = () => ({
    type: ActionType.ShowNewRow as const,
});

export const hideNewRow = () => ({
    type: ActionType.HideNewRow as const,
});

export const showDetailsRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.ShowDetailsRow as const,
});

export const hideDetailsRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.HideDetailsRow as const,
});

export const saveNewRow = (rowKeyValue: unknown, settings?: {
    validate?: boolean
}) => ({
    rowKeyValue,
    validate: settings && settings.validate,
    type: ActionType.SaveNewRow as const,
});

export const openRowEditors = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.OpenRowEditors as const,
});

export const closeRowEditors = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.CloseRowEditors as const,
});

export const saveRowEditors = (rowKeyValue: unknown, settings?: {
    validate?: boolean
}) => ({
    rowKeyValue,
    validate: settings && settings.validate,
    type: ActionType.SaveRowEditors as const,
});

export const updateRow = (rowData: unknown) => {
    return {
        type: ActionType.UpdateRow as const,
        rowData,
    };
};

export const updatePageIndex = (pageIndex: number) => ({
    pageIndex,
    type: ActionType.UpdatePageIndex as const,
});

export const updatePageSize = (pageSize: number) => ({
    pageSize,
    type: ActionType.UpdatePageSize as const,
});

export const updatePagesCount = (pagesCount: number) => ({
    pagesCount,
    type: ActionType.UpdatePagesCount as const,
});

export const resizeColumn = (columnKey: string, width: number) => ({
    type: ActionType.ResizeColumn as const,
    columnKey,
    width,
});

export const reorderRows = (rowKeyValue: unknown, targetRowKeyValue: unknown) => ({
    type: ActionType.ReorderRows as const,
    rowKeyValue,
    targetRowKeyValue,
});

export const reorderColumns = (columnKey: string, targetColumnKey: string) => ({
    type: ActionType.ReorderColumns as const,
    columnKey,
    targetColumnKey,
});

export const moveColumnBefore = (columnKey: string, targetColumnKey: string) => ({
    type: ActionType.MoveColumnBefore as const,
    columnKey,
    targetColumnKey
});

export const insertColumn = (column: Column, index: number) => ({
    type: ActionType.InsertColumn as const,
    column,
    index
});

export const moveColumnToIndex = (columnKey: string, index: number) => ({
    type: ActionType.MoveColumnToIndex as const,
    columnKey,
    index,
});

export const showColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.ShowColumn as const,
});

export const hideColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.HideColumn as const,
});

export const loadData = () => ({
    type: ActionType.LoadData as const
});

export const clearSingleAction = () => ({
    type: ActionType.ClearSingleAction as const
});

// singleAction: an action of the table or of the code which uses the table
export const setSingleAction = (singleAction: CustomAction) => ({
    singleAction,
    type: ActionType.SetSingleAction as const
});

export const clearFocused = () => ({
    type: ActionType.ClearFocused as const
});

export const setFocused = (focused: Focused) => ({
    focused,
    type: ActionType.SetFocused as const
});

export const moveFocusedRight = (settings: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedRight as const
});

export const moveFocusedLeft = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedLeft as const
});

export const moveFocusedUp = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedUp as const
});

export const moveFocusedDown = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedDown as const
});

export const updateTreeGroupsExpanded = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.UpdateTreeGroupsExpanded as const,
});

export const validate = () => ({
    type: ActionType.Validate as const,
});

export const openAllEditors = () => ({
    type: ActionType.OpenAllEditors as const,
});

export const saveAllEditors = () => ({
    type: ActionType.SaveAllEditors as const
});

export const insertRow = (rowData: unknown, options?: {
    rowKeyValue?: unknown,
    insertRowPosition?: InsertRowPosition
}) => ({
    rowData,
    options,
    type: ActionType.InsertRow as const
});

export const groupColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.GroupColumn as const
});

export const ungroupColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.UngroupColumn as const
});
