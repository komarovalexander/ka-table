
import { ActionType } from '../enums';
import { ITableOption } from '../index';
import { Column } from '../models';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../Utils/ArrayUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from '../Utils/CellUtils';
import { replaceValue } from '../Utils/DataUtils';
import { getExpandedGroups, updateExpandedGroups } from '../Utils/GroupUtils';
import { getSortedColumns } from '../Utils/HeadRowUtils';
import { prepareTableOptions } from '../Utils/PropsUtils';

const kaReducer: any = (state: ITableOption, action: any) => {
  const {
    columns,
    data = [],
    editableCells = [],
    groupsExpanded,
    rowKeyField,
    selectedRows = [],
    virtualScrolling,
  } = state;

  switch (action.type) {
    case ActionType.OpenEditor: {
      const newEditableCells = addItemToEditableCells(
        action,
        editableCells);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.CloseEditor: {
      const newEditableCells = removeItemFromEditableCells(
        action,
        editableCells);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.UpdateFilterRowValue: {
      const column = columns.find((c: Column) => c.key === action.columnKey)!;
      const newColumn: Column = {
        ...column,
        filterRowValue: action.filterRowValue,
      };
      const newColumns = getCopyOfArrayAndInsertOrReplaceItem(
        newColumn,
        'key',
        columns,
      );
      return { ...state, columns: newColumns };
    }
    case ActionType.UpdateFilterRowOperator: {
      const column = columns.find((c: Column) => c.key === action.columnKey)!;
      const newColumn: Column = {
        ...column,
        filterRowOperator: action.filterRowOperator,
      };
      const newColumns = getCopyOfArrayAndInsertOrReplaceItem(
        newColumn,
        'key',
        columns,
      );
      return { ...state, columns: newColumns };
    }
    case ActionType.UpdateCellValue: {
      const row = data.find((d) => d[rowKeyField] === action.rowKeyValue);
      const column = columns.find((c) => c.key === action.columnKey)!;
      const newRowData = replaceValue(row, column, action.value);
      const newData = getCopyOfArrayAndInsertOrReplaceItem(newRowData, rowKeyField, data);
      return { ...state, data: newData };
    }
    case ActionType.DeleteRow: {
      const newData = data.filter(
        (d: any) => d[rowKeyField] !== action.rowKeyValue);
      return { ...state, data: newData };
    }
    case ActionType.SelectAllRows: {
      const newSelectedRows = data.map((d) => d[rowKeyField]);
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.Search: {
      return { ...state, search: action.search };
    }
    case ActionType.SelectSingleRow: {
      const newSelectedRows = [action.rowKeyValue];
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectAllRows:
      return { ...state, selectedRows: [] };
    case ActionType.SelectRow:
        return { ...state, selectedRows: [...selectedRows, ...[action.rowKeyValue]] };
    case ActionType.DeselectRow: {
      const newSelectedRows = [...selectedRows].filter((s) => s !== action.rowKeyValue);
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.UpdateSortingDirection:
      const sortedColumns = getSortedColumns(columns, action.columnKey);
      return { ...state, columns: sortedColumns };
    case ActionType.UpdateVirtualScrolling:
      return { ...state, virtualScrolling: action.virtualScrolling };
    case ActionType.UpdateData:
      return { ...state, data: action.data };
    case ActionType.ScrollTable:
      if (virtualScrolling) {
          const scrollTop = action.scrollTop;
          return {...state, ...{virtualScrolling: { ...virtualScrolling, scrollTop }}};
        }
      break;
    case ActionType.ExpandGroup: {
      let currentGroupsExpanded = groupsExpanded;
      if (!currentGroupsExpanded) {
        const preparedOptions = prepareTableOptions(state);
        currentGroupsExpanded = getExpandedGroups(preparedOptions.groupedData);
      }
      const newGroupsExpanded = updateExpandedGroups(
        currentGroupsExpanded,
        action.groupKey,
      );
      return { ...state, groupsExpanded: newGroupsExpanded };
    }
  }
  return state;
};

export {
  kaReducer,
};
