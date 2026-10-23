import * as actionCreators from '../actionCreators';

import { ActionType, InsertRowPosition, SortingMode } from '../enums';
import {
    addColumnsToRowEditableCells,
    addRowKeyValuesToSelectedRows,
    getEditableCellsByData,
    getUpdatedFocused,
    getValidatedEditableCells,
    insertOrReplaceRow,
    removeDataKeysFromSelectedRows,
    removeRowKey,
    replaceRowKeys,
} from '../Utils/ReducerUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from '../Utils/CellUtils';
import { filterAndSearchData, isFilterOperatorWithoutValue, isFilteredByFilterRow } from '../Utils/FilterUtils';
import { getData, isValid } from '../Utils/PropsUtils';
import { getDownCell, getLeftCell, getRightCell, getUpCell } from '../Utils/NavigationUtils';
import { getExpandedGroups, getGroupedAndVisibleColumns, getGroupedData, updateExpandedGroups } from '../Utils/GroupUtils';
import { getExpandedParents, getTreeData } from '../Utils/TreeUtils';
import { getValueByField, insertBefore, reorderData, reorderDataByIndex, replaceValue } from '../Utils/DataUtils';

import { Column } from '../models';
import { ILoadingProps } from '../props';
import { ITableProps } from '../index';
import { VirtualScrolling } from '../Models/VirtualScrolling';
import { getPagingWithPageSize } from '../Utils/PagingUtils';
import { getRowKeyValues } from '../Utils/RowUtils';
import { getUpdatedSortedColumns } from '../Utils/HeadRowUtils';
import { kaPropsUtils } from '../utils';
import { newRowId } from '../const';
import { replaceColumnValue } from '../Utils/ColumnUtils';

// the filtered or found rows are shown from the first page
const withFirstPage = (props: ITableProps): ITableProps => (
    props.paging?.pageIndex ? { ...props, paging: { ...props.paging, pageIndex: 0 } } : props
);

type ActionCreators = typeof actionCreators;

// the action of an action creator: the action creators are named by the types of their actions (deleteRow creates DeleteRow)
type CreatedAction<K extends keyof ActionCreators> = Omit<ReturnType<ActionCreators[K]>, 'type'> & {
    type: Capitalize<K> extends keyof typeof ActionType ? (typeof ActionType)[Capitalize<K>] : never;
};

// the actions of the action creators and the ones which the components of the table dispatch
type TableAction = { [K in keyof ActionCreators]: CreatedAction<K> }[keyof ActionCreators]
    | { type: ActionType.ScrollTable; scrollTop: number }
    | { type: ActionType.UpdateVirtualScrolling; virtualScrolling: VirtualScrolling };

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the public type: the users call it with their states and actions, e.g. in their redux reducers
const kaReducer: any = (props: ITableProps, action: TableAction): ITableProps => {
    const {
        columns,
        data = [],
        detailsRows = [],
        editableCells = [],
        groupsExpanded,
        loading,
        paging,
        treeGroupKeyField,
        treeGroupsExpanded,
        rowKeyField,
        selectedRows = [],
        sortingMode = SortingMode.None,
        virtualScrolling,
    } = props;

    switch (action.type) {
    case ActionType.InsertRow: {
        const {
            rowData,
            options
        } = action;
        const { rowKeyValue, insertRowPosition } = options || {};
        const isAfter = insertRowPosition === InsertRowPosition.after;
        const newData = [...data];
        const rowIndex = rowKeyValue != null ? newData.findIndex((d) => getValueByField(d, rowKeyField) === rowKeyValue) : -1;
        if (rowIndex === -1) {
            // without the row of rowKeyValue the row is inserted at the start or at the end
            isAfter ? newData.push(rowData) : newData.unshift(rowData);
        } else {
            newData.splice(isAfter ? rowIndex + 1 : rowIndex, 0, rowData);
        }
        return { ...props, data: newData };
    }
    case ActionType.UpdateHeaderFilterValues: {
        const newColumns = columns.map((c: Column) => {
            if (c.key !== action.columnKey) {
                return c;
            }
            const headerFilterValues = c.headerFilterValues;
            let newHeaderFilterValues: string[] | undefined;
            if (action.checked) {
                newHeaderFilterValues = headerFilterValues?.includes(action.item)
                    ? headerFilterValues
                    : [...(headerFilterValues || []), action.item];
            } else {
                newHeaderFilterValues = headerFilterValues?.filter((value) => value !== action.item);
            }
            return { ...c, headerFilterValues: newHeaderFilterValues };
        });
        return withFirstPage({ ...props, columns: newColumns });
    }
    case ActionType.ClearAllFilters: {
        const newColumns = columns.map((c: Column) => ({
            ...c,
            filterRowOperator: isFilterOperatorWithoutValue(c.filterRowOperator) ? undefined : c.filterRowOperator,
            filterRowValue: undefined,
            headerFilterValues: undefined,
        }));
        return withFirstPage({ ...props, columns: newColumns });
    }
    case ActionType.UpdatePopupPosition: {
        const newColumns = columns.map((c: Column) => c.isHeaderFilterPopupShown
            ? { ...c, headerFilterPopupPosition: action.popupPosition }
            : c);
        return { ...props, columns: newColumns }
    }
    case ActionType.UpdateHeaderFilterPopupState: {
        const newColumns = columns.map((c: Column) => ({
            ...c,
            isHeaderFilterPopupShown: c.key === action.columnKey ? !c.isHeaderFilterPopupShown : false
        }));
        return { ...props, columns: newColumns }
    }
    case ActionType.MoveFocusedRight: {
        return getUpdatedFocused(props, action, getRightCell);
    }
    case ActionType.MoveFocusedLeft: {
        return getUpdatedFocused(props, action, getLeftCell);
    }
    case ActionType.MoveFocusedUp: {
        return getUpdatedFocused(props, action, getUpCell);
    }
    case ActionType.MoveFocusedDown: {
        return getUpdatedFocused(props, action, getDownCell);
    }
    case ActionType.SetFocused: {
        return { ...props, focused: action.focused };
    }
    case ActionType.ClearFocused: {
        return { ...props, focused: undefined };
    }
    case ActionType.ClearSingleAction: {
        return { ...props, singleAction: undefined };
    }
    case ActionType.SetSingleAction: {
        return { ...props, singleAction: action.singleAction };
    }
    case ActionType.ShowColumn: {
        const newColumns = replaceColumnValue({
            columns,
            columnKey: action.columnKey,
            replacedOption: 'visible',
            replacedValue: true
        });
        return { ...props, columns: newColumns };
    }
    case ActionType.HideColumn: {
        const newColumns = replaceColumnValue({
            columns,
            columnKey: action.columnKey,
            replacedOption: 'visible',
            replacedValue: false
        });
        return { ...props, columns: newColumns };
    }
    case ActionType.ReorderRows: {
        const newData = reorderData(data, (d) => getValueByField(d, rowKeyField), action.rowKeyValue, action.targetRowKeyValue);
        return { ...props, data: newData };
    }
    case ActionType.InsertColumn: {
        const newColumns = [...columns];
        newColumns.splice(action.index, 0, action.column);
        return {
            ...props,
            columns: newColumns,
        };
    }
    case ActionType.MoveColumnBefore: {
        const newColumns = insertBefore(columns, (d) => d.key, action.columnKey, action.targetColumnKey);
        return { ...props, columns: newColumns };
    }
    case ActionType.ReorderColumns: {
        const newData = reorderData(columns, (d) => d.key, action.columnKey, action.targetColumnKey);
        return { ...props, columns: newData };
    }
    case ActionType.MoveColumnToIndex: {
        const newColumns = reorderDataByIndex(columns, (d) => d.key, action.columnKey, action.index != null ? action.index : columns?.length);
        return { ...props, columns: newColumns };
    }
    case ActionType.UngroupColumn: {
        // a group with settings (e.g. enableSummary) is disabled: the settings are used when its column is grouped again
        const newGroups = props?.groups?.flatMap((group) => {
            if (group.columnKey !== action.columnKey) {
                return [group];
            }
            const hasSettings = Object.entries(group).some(([key, value]) => key !== 'columnKey' && key !== 'enabled' && value !== undefined && value !== false);
            return hasSettings ? [{ ...group, enabled: false }] : [];
        });
        return { ...props, groups: newGroups?.length ? newGroups : undefined }
    }
    case ActionType.GroupColumn: {
        const group = props.groups?.find((g) => g.columnKey === action.columnKey);
        // a column which is not in the table or is grouped already is not grouped
        if (!columns?.some((c) => c.key === action.columnKey) || (group && group.enabled !== false)) {
            return props;
        }
        // a disabled group is enabled with its settings and becomes the last one, as a new group
        const { enabled, ...enabledGroup } = group || { columnKey: action.columnKey };
        return { ...props, groups: [...(props.groups || []).filter((g) => g !== group), enabledGroup] };
    }
    case ActionType.ResizeColumn: {
        const { columnKey, width } = action;
        const newColumns = columns.map((column: Column) => {
            if (column.key === columnKey) {
                const newColumn = {
                    ...column,
                };
                if (newColumn.style?.width != null) {
                    newColumn.style = { ...newColumn.style, width };
                }
                if (newColumn.style?.width == null || newColumn.width != null) {
                    newColumn.width = width;
                }
                if (newColumn.colGroup?.style?.width != null) {
                    newColumn.colGroup = { ...newColumn.colGroup, style: { ...newColumn.colGroup.style, width } };
                }
                if (newColumn.colGroup?.width != null) {
                    newColumn.colGroup = { ...newColumn.colGroup, width };
                }
                return newColumn;
            }
            return column;
        });
        return { ...props, columns: newColumns };
    }
    case ActionType.UpdatePageIndex: {
        return { ...props, paging: { ...paging, pageIndex: action.pageIndex } };
    }
    case ActionType.UpdatePageSize: {
        return { ...props, paging: getPagingWithPageSize(paging, action.pageSize) };
    }
    case ActionType.UpdatePagesCount: {
        return { ...props, paging: { ...paging, pagesCount: action.pagesCount } };
    }
    case ActionType.HideLoading: {
        return { ...props, loading: { ...loading, enabled: false } };
    }
    case ActionType.ShowLoading: {
        const newLoading: ILoadingProps = { ...loading, enabled: true };
        if (action.text !== undefined) {
            newLoading.text = action.text;
        }
        return { ...props, loading: newLoading };
    }
    case ActionType.ShowDetailsRow: {
        const newDetailsRows = [...detailsRows];
        newDetailsRows.push(action.rowKeyValue);
        return { ...props, detailsRows: newDetailsRows };
    }
    case ActionType.HideDetailsRow: {
        const newDetailsRows = detailsRows.filter(row => row !== action.rowKeyValue);
        return { ...props, detailsRows: newDetailsRows };
    }
    case ActionType.OpenEditor: {
        const newEditableCells = addItemToEditableCells(
            action,
            editableCells);
        return { ...props, editableCells: newEditableCells };
    }
    case ActionType.CloseEditor: {
        const newEditableCells = removeItemFromEditableCells(
            action,
            editableCells);
        return { ...props, editableCells: newEditableCells };
    }
    case ActionType.UpdateFilterRowValue: {
        const newColumns = replaceColumnValue({
            columns,
            columnKey: action.columnKey,
            replacedOption: 'filterRowValue',
            replacedValue: action.filterRowValue
        });
        return withFirstPage({ ...props, columns: newColumns });
    }
    case ActionType.UpdateHeaderFilterSearchValue: {
        const newColumns = replaceColumnValue({
            columns,
            columnKey: action.columnKey,
            replacedOption: 'headerFilterSearchValue',
            replacedValue: action.headerFilterSearchValue
        });
        return { ...props, columns: newColumns };
    }
    case ActionType.UpdateFilterRowOperator: {
        const newColumns = replaceColumnValue({
            columns,
            columnKey: action.columnKey,
            replacedOption: 'filterRowOperator',
            replacedValue: action.filterRowOperator
        });
        // the operator changes the shown rows only when the column is filtered with the previous or the new operator
        const column = columns.find((c) => c.key === action.columnKey);
        const isFiltered = !!column && (isFilteredByFilterRow(column) || isFilterOperatorWithoutValue(action.filterRowOperator));
        return isFiltered ? withFirstPage({ ...props, columns: newColumns }) : { ...props, columns: newColumns };
    }
    case ActionType.UpdateEditorValue: {
        const editableCellIndex = editableCells.findIndex((c) => c.columnKey === action.columnKey && c.rowKeyValue === action.rowKeyValue);
        if (editableCellIndex === -1) {
            return props;
        }
        const newEditableCells = [...editableCells];
        newEditableCells[editableCellIndex] = { ...newEditableCells[editableCellIndex], editorValue: action.value };
        return { ...props, editableCells: newEditableCells };
    }
    case ActionType.UpdateCellValue: {
        const rowIndex = data.findIndex((d) => getValueByField(d, rowKeyField) === action.rowKeyValue);
        const column = columns.find((c) => c.key === action.columnKey);
        if (rowIndex === -1 || !column) {
            return props;
        }
        const updatedRowData = replaceValue(data[rowIndex], column, action.value);
        // the row is replaced by its index: the value of its key can be changed
        const newData = [...data];
        newData[rowIndex] = updatedRowData;
        // the editor is closed with the previous key (closeEditor follows updateCellValue), so editableCells keep it
        return replaceRowKeys({ ...props, data: newData }, new Map([[action.rowKeyValue, getValueByField(updatedRowData, rowKeyField)]]));
    }
    case ActionType.DeleteRow: {
        const newData = data.filter(
            (d) => getValueByField(d, rowKeyField) !== action.rowKeyValue);
        return removeRowKey({ ...props, data: newData }, action.rowKeyValue);
    }
    case ActionType.SelectAllRows: {
        const newSelectedRows = data.map((d) => getValueByField(d, rowKeyField));
        return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.SelectAllFilteredRows: {
        const newData = filterAndSearchData(props);
        let newSelectedRows = removeDataKeysFromSelectedRows(selectedRows, newData, rowKeyField);
        newSelectedRows = [...newSelectedRows, ...newData.map((d) => getValueByField(d, rowKeyField))];
        return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.SelectAllVisibleRows: {
        const newData = getData(props);
        let newSelectedRows = removeDataKeysFromSelectedRows(selectedRows, newData, rowKeyField);
        newSelectedRows = [...newSelectedRows, ...getRowKeyValues(newData, rowKeyField)];
        return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.Search: {
        return withFirstPage({ ...props, searchText: action.searchText });
    }
    case ActionType.SelectSingleRow: {
        const newSelectedRows = [action.rowKeyValue];
        return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectAllRows:
        return { ...props, selectedRows: [] };
    case ActionType.DeselectAllFilteredRows: {
        const newData = filterAndSearchData(props);
        const newSelectedRows = removeDataKeysFromSelectedRows(selectedRows, newData, rowKeyField);
        return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectAllVisibleRows: {
        const newData = getData(props);
        const newSelectedRows = removeDataKeysFromSelectedRows(selectedRows, newData, rowKeyField);
        return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.SelectRow:
        return { ...props, selectedRows: addRowKeyValuesToSelectedRows(selectedRows, [action.rowKeyValue]) };
    case ActionType.SelectRows:
        return { ...props, selectedRows: addRowKeyValuesToSelectedRows(selectedRows, action.rowsKeyValues) };
    case ActionType.SelectRowsRange: {
        const { rowKeyValueFrom, rowKeyValueTo } = action;
        if (rowKeyValueTo != null) {
            const shownRowKeyValues = getRowKeyValues(kaPropsUtils.getData(props), rowKeyField);
            const rowKeyValueToIndex = shownRowKeyValues.indexOf(rowKeyValueTo);
            const rowKeyValueFromIndex = shownRowKeyValues.indexOf(rowKeyValueFrom);
            if (rowKeyValueToIndex !== -1 && rowKeyValueFromIndex !== -1) {
                const [start, end] = rowKeyValueToIndex > rowKeyValueFromIndex ? [rowKeyValueFromIndex, rowKeyValueToIndex] : [rowKeyValueToIndex, rowKeyValueFromIndex];
                const rowsToSelect = shownRowKeyValues
                    .slice(start, end + 1)
                    .filter(value => value !== undefined);
                return { ...props, selectedRows: addRowKeyValuesToSelectedRows(selectedRows, rowsToSelect) };
            }
        }
        return { ...props, selectedRows: addRowKeyValuesToSelectedRows(selectedRows, [rowKeyValueFrom]) };
    }
    case ActionType.DeselectRow: {
        const newSelectedRows = [...selectedRows].filter((s) => s !== action.rowKeyValue);
        return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectRows: {
        const rowsKeyValues = new Set(action.rowsKeyValues);
        const newSelectedRows = selectedRows.filter((s) => !rowsKeyValues.has(s));
        return { ...props, selectedRows: newSelectedRows };
    }
    case ActionType.UpdateSortDirection: {
        const sortedColumns = getUpdatedSortedColumns(columns, action.columnKey, sortingMode);
        return { ...props, columns: sortedColumns };
    }
    case ActionType.UpdateVirtualScrolling:
        return { ...props, virtualScrolling: action.virtualScrolling };
    case ActionType.UpdateData:
        return { ...props, data: action.data };
    case ActionType.ScrollTable: {
        const scrollTop = action.scrollTop;
        return { ...props, ...{ virtualScrolling: { ...virtualScrolling, scrollTop } } };
    }
    case ActionType.UpdateGroupsExpanded: {
        let currentGroupsExpanded = groupsExpanded;
        if (!currentGroupsExpanded) {
            // all the groups are expanded: the groups of the other pages and the filtered groups stay expanded
            const { groupedColumns } = getGroupedAndVisibleColumns(columns, props.groups);
            currentGroupsExpanded = getExpandedGroups(getGroupedData(data, props.groups || [], groupedColumns));
        }
        const newGroupsExpanded = updateExpandedGroups(
            currentGroupsExpanded,
            action.groupKey,
        );
        return { ...props, groupsExpanded: newGroupsExpanded };
    }
    case ActionType.ShowNewRow:
    case ActionType.OpenRowEditors: {
        const rowKeyValue = action.type === ActionType.ShowNewRow ? newRowId : action.rowKeyValue;
        const newEditableCells = addColumnsToRowEditableCells(editableCells, columns, rowKeyValue);
        return { ...props, editableCells: newEditableCells };
    }
    case ActionType.OpenAllEditors: {
        const newEditableCells = getEditableCellsByData(data, rowKeyField, columns);
        return { ...props, editableCells: newEditableCells };
    }
    case ActionType.HideNewRow:
    case ActionType.CloseRowEditors: {
        const rowKeyValue = action.type === ActionType.HideNewRow ? newRowId : action.rowKeyValue;
        const newEditableCells = editableCells.filter(e => e.rowKeyValue !== rowKeyValue);
        return { ...props, editableCells: newEditableCells };
    }
    case ActionType.Validate: {
        const newEditableCells = getValidatedEditableCells(props);
        return { ...props, editableCells: [...newEditableCells] };
    }
    case ActionType.SaveAllEditors: {
        // the rows are found by their keys before the saving: an edited key doesn't move the values of the next editors
        const rowIndexes = new Map<unknown, number>();
        data.forEach((d, index) => {
            const rowKeyValue = getValueByField(d, rowKeyField);
            if (!rowIndexes.has(rowKeyValue)) {
                rowIndexes.set(rowKeyValue, index);
            }
        });
        const newData = [...data];
        editableCells?.forEach(editableCell => {
            if (Object.prototype.hasOwnProperty.call(editableCell, 'editorValue')) {
                const rowIndex = rowIndexes.get(editableCell.rowKeyValue);
                const column = columns.find((c) => c.key === editableCell.columnKey);
                if (rowIndex !== undefined && column) {
                    newData[rowIndex] = replaceValue(newData[rowIndex], column, editableCell.editorValue);
                }
            }
        });
        // the editors stay open, so they follow the keys of their rows
        const newRowKeys = new Map([...rowIndexes].map(([rowKeyValue, rowIndex]) => [rowKeyValue, getValueByField(newData[rowIndex], rowKeyField)]));
        return replaceRowKeys({ ...props, data: newData }, newRowKeys, true);
    }
    case ActionType.SaveRowEditors:
    case ActionType.SaveNewRow: {
        const isNewRow = action.type === ActionType.SaveNewRow;
        const rowEditorKeyValue = isNewRow ? newRowId : action.rowKeyValue;
        const rowIndex = data.findIndex((d) => getValueByField(d, rowKeyField) === rowEditorKeyValue);
        let updatedRowData = data[rowIndex];
        const rowEditableCells = editableCells.filter(
            editableCell => editableCell.rowKeyValue === rowEditorKeyValue
                    && (isNewRow || Object.prototype.hasOwnProperty.call(editableCell, 'editorValue')));
        if (isNewRow ? !rowEditableCells.length : !updatedRowData) {
            // the new row is not shown or the row is not in data: there is nothing to save
            return props;
        }
        if (action.validate && !isValid({ ...props, editableCells: rowEditableCells })) {
            const validatedRowEditableCells = getValidatedEditableCells({ ...props, editableCells: rowEditableCells });
            const validatedEditableCells = editableCells.map(cell => {
                const index = rowEditableCells.indexOf(cell);
                return index === -1 ? cell : validatedRowEditableCells[index];
            });
            return { ...props, editableCells: validatedEditableCells };
        }
        const newEditableCells = editableCells.filter(e => e.rowKeyValue !== rowEditorKeyValue);
        rowEditableCells.forEach(cell => {
            const column = columns.find((c) => c.key === cell.columnKey);
            if (column) {
                updatedRowData = replaceValue(updatedRowData, column, cell.editorValue);
            }
        });
        if (isNewRow) {
            updatedRowData = replaceValue(updatedRowData, { key: rowKeyField }, action.rowKeyValue);
            return { ...props, data: [updatedRowData, ...data], editableCells: newEditableCells };
        }
        // the row is replaced by its index: the value of its key can be changed
        const newData = [...data];
        newData[rowIndex] = updatedRowData;
        return replaceRowKeys({ ...props, data: newData, editableCells: newEditableCells }, new Map([[rowEditorKeyValue, getValueByField(updatedRowData, rowKeyField)]]));
    }
    case ActionType.UpdateRow: {
        const newData = insertOrReplaceRow(data, action.rowData, rowKeyField);
        return { ...props, data: newData };
    }
    case ActionType.UpdateTreeGroupsExpanded: {
        const rowKeyValue = action.rowKeyValue;
        const value = treeGroupsExpanded ? !treeGroupsExpanded.some(v => v === rowKeyValue) : false;
        if (value) {
            return { ...props, treeGroupsExpanded: [...(treeGroupsExpanded || []), rowKeyValue] };
        }
        let currentExpanded = treeGroupsExpanded;
        if (!currentExpanded) {
            // all the rows are expanded: the rows of the other pages and the filtered rows stay expanded
            currentExpanded = treeGroupKeyField
                ? getExpandedParents(getTreeData({ data, originalData: data, rowKeyField, treeGroupKeyField }), rowKeyField)
                : [];
        }
        return { ...props, treeGroupsExpanded: currentExpanded.filter(item => item !== rowKeyValue) };
    }
    }
    return props;
};

export {
    kaReducer,
};
