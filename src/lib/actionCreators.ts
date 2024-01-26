import { ActionType, InsertRowPosition } from './enums';

import { Column } from './Models/Column';
import { Focused } from './Models/Focused';
import { IMoveFocusedSettings } from './Utils/NavigationUtils';
import { PopupPosition } from './Models/PopupPosition';

export const updateHeaderFilterValues = (columnKey: string, item: any, checked: boolean) => ({
    columnKey,
    checked,
    item,
    type: ActionType.UpdateHeaderFilterValues
});

export const updatePopupPosition = (popupPosition: PopupPosition) => ({
    popupPosition,
    type: ActionType.UpdatePopupPosition
});

export const updateHeaderFilterPopupState = (columnKey: string, isHeaderFilterPopupShown?: boolean) => ({
    columnKey,
    isHeaderFilterPopupShown,
    type: ActionType.UpdateHeaderFilterPopupState
});

export const updateFilterRowValue = (columnKey: string, filterRowValue: any) => ({
    columnKey,
    filterRowValue,
    type: ActionType.UpdateFilterRowValue,
});

export const updateHeaderFilterSearchValue = (columnKey: string, headerFilterSearchValue: any) => ({
    columnKey,
    headerFilterSearchValue,
    type: ActionType.UpdateHeaderFilterSearchValue,
});

export const updateFilterRowOperator = (columnKey: string, filterRowOperator: string) => ({
    columnKey,
    filterRowOperator,
    type: ActionType.UpdateFilterRowOperator,
});

export const updateEditorValue = (rowKeyValue: any, columnKey: string, value: any) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.UpdateEditorValue,
    value,
});

export const updateCellValue = (rowKeyValue: any, columnKey: string, value: any) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.UpdateCellValue,
    value,
});

export const updateSortDirection = (columnKey: string) => ({
    columnKey,
    type: ActionType.UpdateSortDirection,
});

export const closeEditor = (rowKeyValue: any, columnKey: string) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.CloseEditor,
});

export const deleteRow = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.DeleteRow,
});

export const deselectAllRows = () => ({
    type: ActionType.DeselectAllRows,
});

export const deselectAllFilteredRows = () => ({
    type: ActionType.DeselectAllFilteredRows,
});

export const deselectAllVisibleRows = () => ({
    type: ActionType.DeselectAllVisibleRows,
});

export const deselectRow = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.DeselectRow,
});

export const deselectRows = (rowsKeyValues: any[]) => ({
    rowsKeyValues,
    type: ActionType.DeselectRows,
});

export const openEditor = (rowKeyValue: any, columnKey: string) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.OpenEditor,
});

export const search = (searchText: any) => ({
    searchText,
    type: ActionType.Search,
});

export const selectAllRows = () => ({
    type: ActionType.SelectAllRows,
});

export const selectAllFilteredRows = () => ({
    type: ActionType.SelectAllFilteredRows,
});

export const selectAllVisibleRows = () => ({
    type: ActionType.SelectAllVisibleRows,
});

export const selectSingleRow = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.SelectSingleRow,
});

export const selectRow = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.SelectRow,
});

export const selectRows = (rowsKeyValues: any) => ({
    rowsKeyValues,
    type: ActionType.SelectRows,
});

export const selectRowsRange = (rowKeyValueFrom: any, rowKeyValueTo: any) => ({
    rowKeyValueFrom,
    rowKeyValueTo,
    type: ActionType.SelectRowsRange,
});

export const updateGroupsExpanded = (groupKey: any[]) => ({
    groupKey,
    type: ActionType.UpdateGroupsExpanded,
});

export const updateData = (data: any[]) => ({
    data,
    type: ActionType.UpdateData,
});

export const showLoading = (text?: string) => ({
    text,
    type: ActionType.ShowLoading,
});

export const hideLoading = () => ({
    type: ActionType.HideLoading,
});

export const showNewRow = () => ({
    type: ActionType.ShowNewRow,
});

export const hideNewRow = () => ({
    type: ActionType.HideNewRow,
});

export const showDetailsRow = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.ShowDetailsRow,
});

export const hideDetailsRow = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.HideDetailsRow,
});

export const saveNewRow = (rowKeyValue: any, settings?: {
    validate?: boolean
}) => ({
    rowKeyValue,
    validate: settings && settings.validate,
    type: ActionType.SaveNewRow,
});

export const openRowEditors = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.OpenRowEditors,
});

export const closeRowEditors = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.CloseRowEditors,
});

export const saveRowEditors = (rowKeyValue: any, settings?: {
    validate?: boolean
}) => ({
    rowKeyValue,
    validate: settings && settings.validate,
    type: ActionType.SaveRowEditors,
});

export const updateRow = (rowData: any) => {
    return {
        type: ActionType.UpdateRow,
        rowData,
    };
};

export const updatePageIndex = (pageIndex: number) => ({
    pageIndex,
    type: ActionType.UpdatePageIndex,
});

export const updatePageSize = (pageSize: number) => ({
    pageSize,
    type: ActionType.UpdatePageSize,
});

export const updatePagesCount = (pagesCount: number) => ({
    pagesCount,
    type: ActionType.UpdatePagesCount,
});

export const resizeColumn = (columnKey: string, width: number) => ({
    type: ActionType.ResizeColumn,
    columnKey,
    width,
});

export const reorderRows = (rowKeyValue: any, targetRowKeyValue: any) => ({
    type: ActionType.ReorderRows,
    rowKeyValue,
    targetRowKeyValue,
});

export const reorderColumns = (columnKey: string, targetColumnKey: string) => ({
    type: ActionType.ReorderColumns,
    columnKey,
    targetColumnKey,
});

export const moveColumnBefore = (columnKey: string, targetColumnKey: string) => ({
    type: ActionType.MoveColumnBefore,
    columnKey,
    targetColumnKey
});

export const insertColumn = (column: Column, index: number) => ({
    type: ActionType.InsertColumn,
    column,
    index
});

export const moveColumnToIndex = (columnKey: string, index: number) => ({
    type: ActionType.MoveColumnToIndex,
    columnKey,
    index,
});

export const showColumn = (columnKey: any) => ({
    columnKey,
    type: ActionType.ShowColumn,
});

export const hideColumn = (columnKey: any) => ({
    columnKey,
    type: ActionType.HideColumn,
});

export const loadData = () => ({
    type: ActionType.LoadData
});

export const clearSingleAction = () => ({
    type: ActionType.ClearSingleAction
});

export const setSingleAction = (singleAction: any) => ({
    singleAction,
    type: ActionType.SetSingleAction
});

export const clearFocused = () => ({
    type: ActionType.ClearFocused
});

export const setFocused = (focused: Focused) => ({
    focused,
    type: ActionType.SetFocused
});

export const moveFocusedRight = (settings: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedRight
});

export const moveFocusedLeft = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedLeft
});

export const moveFocusedUp = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedUp
});

export const moveFocusedDown = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedDown
});

export const updateTreeGroupsExpanded = (rowKeyValue: any) => ({
    rowKeyValue,
    type: ActionType.UpdateTreeGroupsExpanded,
});

export const validate = () => ({
    type: ActionType.Validate,
});

export const openAllEditors = () => ({
    type: ActionType.OpenAllEditors,
});

export const saveAllEditors = () => ({
    type: ActionType.SaveAllEditors
});

export const insertRow = (rowData: any, options?: {
    rowKeyValue?: any,
    insertRowPosition?: InsertRowPosition
}) => ({
    rowData,
    options,
    type: ActionType.InsertRow
});

export const groupColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.GroupColumn
});

export const ungroupColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.UngroupColumn
});
