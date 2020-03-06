import { ActionType } from '../enums';
import { ITableOption } from '../index';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../Utils/ArrayUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from '../Utils/CellUtils';
import { updateExpandedGroups } from '../Utils/GroupUtils';
import { getSortedColumns } from '../Utils/HeadRowUtils';

const kaReducer = (state: ITableOption, action: any, actionData: any) => {
  const {
    columns,
    data = [],
    editableCells = [],
    groupsExpanded = [],
    rowKeyField,
    selectedRows = [],
    virtualScrolling,
  } = state;

  if (actionData) {
    console.warn('ka-table: dispatch(actionType, actionData) is deprecated, use dispatch({ type: actionType, ...actionData }) instead');
    action = { type: action, ...actionData };
  }

  switch (action.type) {
    case ActionType.OpenEditor: {
      const newEditableCells = addItemToEditableCells(
        action.cell,
        editableCells);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.CloseEditor: {
      const newEditableCells = removeItemFromEditableCells(
        action.cell,
        editableCells);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.ChangeFilterRow:
      const newColumns = getCopyOfArrayAndInsertOrReplaceItem(action.column, 'key', columns);
      return { ...state, columns: newColumns };
    case ActionType.ChangeRowData:
    case ActionType.ChangeRow: {
      const newData = getCopyOfArrayAndInsertOrReplaceItem(action.newValue, rowKeyField, data);
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
    case ActionType.SelectSingleRow: {
      const newSelectedRows = [action.rowKeyValue];
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectAllRows:
      return { ...state, selectedRows: [] };
    case ActionType.SelectRow:
        return { ...state, selectedRows: [...selectedRows, ...[action.rowKeyValue]] };
    case ActionType.DeselectRowData:
    case ActionType.DeselectRow: {
      const newSelectedRows = [...selectedRows].filter((s) => s !== action.rowKeyValue);
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.ChangeSorting:
      const sortedColumns = getSortedColumns(columns, action.column);
      return { ...state, columns: sortedColumns };
    case ActionType.ChangeVirtualScrollingHeightSettings:
      return { ...state, virtualScrolling: action.virtualScrolling };
    case ActionType.ScrollTable:
      if (virtualScrolling) {
          const scrollPosition = action.scrollTop;
          return {...state, ...{virtualScrolling: { ...virtualScrolling, scrollPosition }}};
        }
      break;
    case ActionType.UpdateGroupsExpanded:
      const newGroupsExpanded = updateExpandedGroups(
        groupsExpanded,
        action.groupKey,
      );
      return { ...state, groupsExpanded: newGroupsExpanded };
  }
  return state;
};

export {
  kaReducer,
};
