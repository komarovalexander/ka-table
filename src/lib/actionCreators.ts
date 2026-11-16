import { ActionType, InsertRowPosition } from './enums';
import { CustomAction } from './types';

import { Column } from './Models/Column';
import { Focused } from './Models/Focused';
import { IMoveFocusedSettings } from './Utils/NavigationUtils';
import { PopupPosition } from './Models/PopupPosition';

/**
 * Fires when user selects/deselects value in the header filter
 * @group Sorting, filtering and search
 */
export const updateHeaderFilterValues = (columnKey: string, item: string, checked: boolean) => ({
    columnKey,
    checked,
    item,
    type: ActionType.UpdateHeaderFilterValues as const
});

/**
 * Fires when header filter popup is shown
 * @group Sorting, filtering and search
 */
export const updatePopupPosition = (popupPosition: PopupPosition) => ({
    popupPosition,
    type: ActionType.UpdatePopupPosition as const
});

/**
 * Shows/hides the header filter popup
 * @group Sorting, filtering and search
 */
export const updateHeaderFilterPopupState = (columnKey: string, isHeaderFilterPopupShown?: boolean) => ({
    columnKey,
    isHeaderFilterPopupShown,
    type: ActionType.UpdateHeaderFilterPopupState as const
});

/**
 * Update _filterRowValue_ for specific column
 * @group Sorting, filtering and search
 */
export const updateFilterRowValue = (columnKey: string, filterRowValue: unknown) => ({
    columnKey,
    filterRowValue,
    type: ActionType.UpdateFilterRowValue as const,
});

/**
 * Updates the search text of the header filter popup
 * @group Sorting, filtering and search
 */
export const updateHeaderFilterSearchValue = (columnKey: string, headerFilterSearchValue: string) => ({
    columnKey,
    headerFilterSearchValue,
    type: ActionType.UpdateHeaderFilterSearchValue as const,
});

/**
 * Update _filterRowOperator_ for specific column
 * @group Sorting, filtering and search
 */
export const updateFilterRowOperator = (columnKey: string, filterRowOperator: string) => ({
    columnKey,
    filterRowOperator,
    type: ActionType.UpdateFilterRowOperator as const,
});

/**
 * Clears all table filters
 * @group Sorting, filtering and search
 */
export const clearAllFilters = () => ({
    type: ActionType.ClearAllFilters as const,
});

/**
 * Update editorCell in _editableCells_
 * @group Editing
 */
export const updateEditorValue = (rowKeyValue: unknown, columnKey: string, value: unknown) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.UpdateEditorValue as const,
    value
});

/**
 * Update _data_
 * @group Editing
 */
export const updateCellValue = (rowKeyValue: unknown, columnKey: string, value: unknown) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.UpdateCellValue as const,
    value
});

/**
 * Update _sortDirection_ to the opposite for specific column
 * @group Sorting, filtering and search
 */
export const updateSortDirection = (columnKey: string) => ({
    columnKey,
    type: ActionType.UpdateSortDirection as const,
});

/**
 * Removes cell from _editableCells_
 *
 * note: when _EditingMode.Cell_ is enabled table calls _CloseEditor_ action each time editor loses focus
 * @group Editing
 */
export const closeEditor = (rowKeyValue: unknown, columnKey: string) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.CloseEditor as const,
});

/**
 * Deletes row from _data_ and its key from _selectedRows_, _detailsRows_, _treeGroupsExpanded_, _editableCells_ and
 * _focused_
 * @group Data and loading
 */
export const deleteRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.DeleteRow as const,
});

/**
 * Clears _selectedRows_
 * @group Selection
 */
export const deselectAllRows = () => ({
    type: ActionType.DeselectAllRows as const,
});

/**
 * Remove all filtered items ids of _data_ to _selectedRows_
 * @group Selection
 */
export const deselectAllFilteredRows = () => ({
    type: ActionType.DeselectAllFilteredRows as const,
});

/**
 * Remove all visible items ids of _data_ to _selectedRows_
 * @group Selection
 */
export const deselectAllVisibleRows = () => ({
    type: ActionType.DeselectAllVisibleRows as const,
});

/**
 * Removes row id from _selectedRows_
 * @group Selection
 */
export const deselectRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.DeselectRow as const,
});

/**
 * Removes rows ids from _selectedRows_
 * @group Selection
 */
export const deselectRows = (rowsKeyValues: unknown[]) => ({
    rowsKeyValues,
    type: ActionType.DeselectRows as const,
});

/**
 * Add cell to _editableCells_
 * @group Editing
 */
export const openEditor = (rowKeyValue: unknown, columnKey: string) => ({
    columnKey,
    rowKeyValue,
    type: ActionType.OpenEditor as const,
});

/**
 * Change _searchText_ option
 * @group Sorting, filtering and search
 */
export const search = (searchText: string) => ({
    searchText,
    type: ActionType.Search as const,
});

/**
 * Add all items ids of _data_ to _selectedRows_
 * @group Selection
 */
export const selectAllRows = () => ({
    type: ActionType.SelectAllRows as const,
});

/**
 * Add all filtered items ids of _data_ to _selectedRows_
 * @group Selection
 */
export const selectAllFilteredRows = () => ({
    type: ActionType.SelectAllFilteredRows as const,
});

/**
 * Add all visible items ids of _data_ to _selectedRows_
 * @group Selection
 */
export const selectAllVisibleRows = () => ({
    type: ActionType.SelectAllVisibleRows as const,
});

/**
 * Set _selectedRows_ as an array with one row id
 * @group Selection
 */
export const selectSingleRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.SelectSingleRow as const,
});

/**
 * Add row id to _selectedRows_
 * @group Selection
 */
export const selectRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.SelectRow as const,
});

/**
 * Add rows ids to _selectedRows_
 * @group Selection
 */
export const selectRows = (rowsKeyValues: unknown[]) => ({
    rowsKeyValues,
    type: ActionType.SelectRows as const,
});

/**
 * rowKeyValueFrom, rowKeyValueTo describe start and end of visible elements range, all ids added to _selectedRows_
 * @group Selection
 */
export const selectRowsRange = (rowKeyValueFrom: unknown, rowKeyValueTo: unknown) => ({
    rowKeyValueFrom,
    rowKeyValueTo,
    type: ActionType.SelectRowsRange as const,
});

/**
 * Add/remove group id to/from _groupsExpanded_
 * @group Grouping, tree and details rows
 */
export const updateGroupsExpanded = (groupKey: unknown[]) => ({
    groupKey,
    type: ActionType.UpdateGroupsExpanded as const,
});

/**
 * Update _data_
 * @group Data and loading
 */
export const updateData = (data: unknown[]) => ({
    data,
    type: ActionType.UpdateData as const,
});

/**
 * Set _loading_ = true and updates the text if text is specified
 * @group Data and loading
 */
export const showLoading = (text?: string) => ({
    text,
    type: ActionType.ShowLoading as const,
});

/**
 * Set _loading_ = false
 * @group Data and loading
 */
export const hideLoading = () => ({
    type: ActionType.HideLoading as const,
});

/**
 * Add new row cells to _editableCells_
 * @group Editing
 */
export const showNewRow = () => ({
    type: ActionType.ShowNewRow as const,
});

/**
 * Removes row cells from _editableCells_
 * @group Editing
 */
export const hideNewRow = () => ({
    type: ActionType.HideNewRow as const,
});

/**
 * Adds the row key to _detailsRows_
 * @group Grouping, tree and details rows
 */
export const showDetailsRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.ShowDetailsRow as const,
});

/**
 * Removes the row key from _detailsRows_
 * @group Grouping, tree and details rows
 */
export const hideDetailsRow = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.HideDetailsRow as const,
});

/**
 * Saves editor values to the new item of _data_ and removes row cells from _editableCells_.
 *
 * Settings is optional:
 *
 * validate - validate values before save, do not save if validation is unsuccessful.
 * @group Editing
 */
export const saveNewRow = (rowKeyValue: unknown, settings?: {
    validate?: boolean
}) => ({
    rowKeyValue,
    validate: settings && settings.validate,
    type: ActionType.SaveNewRow as const,
});

/**
 * Add row cells to _editableCells_
 * @group Editing
 */
export const openRowEditors = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.OpenRowEditors as const,
});

/**
 * Removes row cells from _editableCells_
 * @group Editing
 */
export const closeRowEditors = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.CloseRowEditors as const,
});

/**
 * Saves editor values to _data_ and removes row cells from _editableCells_.
 *
 * Settings is optional:
 *
 * validate - validate values before save, do not save and do not close if validation is unsuccessful.
 * @group Editing
 */
export const saveRowEditors = (rowKeyValue: unknown, settings?: {
    validate?: boolean
}) => ({
    rowKeyValue,
    validate: settings && settings.validate,
    type: ActionType.SaveRowEditors as const,
});

/**
 * Replaces the row with the same key in _data_
 * @group Data and loading
 */
export const updateRow = (rowData: unknown) => {
    return {
        type: ActionType.UpdateRow as const,
        rowData,
    };
};

/**
 * Update _paging.pageIndex_ option and show new page data
 * @group Paging and scrolling
 */
export const updatePageIndex = (pageIndex: number) => ({
    pageIndex,
    type: ActionType.UpdatePageIndex as const,
});

/**
 * Update _paging.pageSize_, the first row of the page stays shown
 * @group Paging and scrolling
 */
export const updatePageSize = (pageSize: number) => ({
    pageSize,
    type: ActionType.UpdatePageSize as const,
});

/**
 * Update _paging.pagesCount_ (remote paging)
 * @group Paging and scrolling
 */
export const updatePagesCount = (pagesCount: number) => ({
    pagesCount,
    type: ActionType.UpdatePagesCount as const,
});

/**
 * Change column width
 * @group Columns
 */
export const resizeColumn = (columnKey: string, width: number) => ({
    type: ActionType.ResizeColumn as const,
    columnKey,
    width,
});

/**
 * Place rowKeyValue to the position of targetRowKeyValue
 * @group Data and loading
 */
export const reorderRows = (rowKeyValue: unknown, targetRowKeyValue: unknown) => ({
    type: ActionType.ReorderRows as const,
    rowKeyValue,
    targetRowKeyValue,
});

/**
 * Place columnKey to the position of targetColumnKey
 * @group Columns
 */
export const reorderColumns = (columnKey: string, targetColumnKey: string) => ({
    type: ActionType.ReorderColumns as const,
    columnKey,
    targetColumnKey,
});

/**
 * Move _columnKey_ to position before _targetColumnKey_ in _columns_
 * @group Columns
 */
export const moveColumnBefore = (columnKey: string, targetColumnKey: string) => ({
    type: ActionType.MoveColumnBefore as const,
    columnKey,
    targetColumnKey
});

/**
 * Inserts column to specific position in the _columns_
 * @group Columns
 */
export const insertColumn = (column: Column, index: number) => ({
    type: ActionType.InsertColumn as const,
    column,
    index
});

/**
 * Move _columnKey_ to _index_ position in _columns_
 * @group Columns
 */
export const moveColumnToIndex = (columnKey: string, index: number) => ({
    type: ActionType.MoveColumnToIndex as const,
    columnKey,
    index,
});

/**
 * Sets _visible=true_ for specific column
 * @group Columns
 */
export const showColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.ShowColumn as const,
});

/**
 * Sets _visible=false_ for specific column
 * @group Columns
 */
export const hideColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.HideColumn as const,
});

/**
 * Notifies grid about time to reload its data
 * @group Data and loading
 */
export const loadData = () => ({
    type: ActionType.LoadData as const
});

/**
 * Sets singleAction as undefined
 * @group Single action
 */
export const clearSingleAction = () => ({
    type: ActionType.ClearSingleAction as const
});

/**
 * Set _singleAction_ property
 * @group Single action
 */
// singleAction: an action of the table or of the code which uses the table
export const setSingleAction = (singleAction: CustomAction) => ({
    singleAction,
    type: ActionType.SetSingleAction as const
});

/**
 * Sets focused as undefined
 * @group Focus
 */
export const clearFocused = () => ({
    type: ActionType.ClearFocused as const
});

/**
 * Set _focused_ property: the cell or the group row focused by a click, Tab or the keyboard navigation
 * @group Focus
 */
export const setFocused = (focused: Focused) => ({
    focused,
    type: ActionType.SetFocused as const
});

/**
 * Move focused one cell right
 * @group Focus
 */
export const moveFocusedRight = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedRight as const
});

/**
 * Move focused one cell left
 * @group Focus
 */
export const moveFocusedLeft = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedLeft as const
});

/**
 * Move focused one cell up
 * @group Focus
 */
export const moveFocusedUp = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedUp as const
});

/**
 * Move focused one cell down
 * @group Focus
 */
export const moveFocusedDown = (settings?: IMoveFocusedSettings) => ({
    settings,
    type: ActionType.MoveFocusedDown as const
});

/**
 * Adds/removes _rowKeyValue_ to/from _treeGroupsExpanded_
 * @group Grouping, tree and details rows
 */
export const updateTreeGroupsExpanded = (rowKeyValue: unknown) => ({
    rowKeyValue,
    type: ActionType.UpdateTreeGroupsExpanded as const,
});

/**
 * Adds/removes _validationMessage_ to/from _editableCells_ items
 * @group Editing
 */
export const validate = () => ({
    type: ActionType.Validate as const,
});

/**
 * Adds each data cell to _editableCells_
 * @group Editing
 */
export const openAllEditors = () => ({
    type: ActionType.OpenAllEditors as const,
});

/**
 * Saves _editableCells_ editorValues to _data_
 * @group Editing
 */
export const saveAllEditors = () => ({
    type: ActionType.SaveAllEditors as const
});

/**
 * Inserts row to specific position in the _data_
 * @group Data and loading
 */
export const insertRow = (rowData: unknown, options?: {
    rowKeyValue?: unknown,
    insertRowPosition?: InsertRowPosition
}) => ({
    rowData,
    options,
    type: ActionType.InsertRow as const
});

/**
 * Groups _columnKey_
 * @group Grouping, tree and details rows
 */
export const groupColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.GroupColumn as const
});

/**
 * Ungroups _columnKey_
 * @group Grouping, tree and details rows
 */
export const ungroupColumn = (columnKey: string) => ({
    columnKey,
    type: ActionType.UngroupColumn as const
});
