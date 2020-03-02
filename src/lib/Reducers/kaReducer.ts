import { ActionType } from '../enums';
import { ITableOption } from '../index';
import { getCopyOfArrayAndInsertOrReplaceItem } from '../Utils/ArrayUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from '../Utils/CellUtils';
import { updateExpandedGroups } from '../Utils/GroupUtils';
import { getSortedColumns } from '../Utils/HeadRowUtils';

const kaReducer = (state: ITableOption, actionType: string, actionData: any) => {
  const {
    columns,
    data = [],
    editableCells = [],
    groupsExpanded = [],
    rowKeyField,
    selectedRows = [],
    virtualScrolling,
  } = state;
  switch (actionType) {
    case ActionType.OpenEditor: {
      const newEditableCells = addItemToEditableCells(
        actionData.cell,
        editableCells);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.CloseEditor: {
      const newEditableCells = removeItemFromEditableCells(
        actionData.cell,
        editableCells);
      return { ...state, editableCells: newEditableCells };
    }
    case ActionType.ChangeFilterRow:
      const newColumns = getCopyOfArrayAndInsertOrReplaceItem(actionData.column, 'key', columns);
      return { ...state, columns: newColumns };
    case ActionType.ChangeRowData:
    case ActionType.ChangeRow: {
      const newData = getCopyOfArrayAndInsertOrReplaceItem(actionData.newValue, rowKeyField, data);
      return { ...state, data: newData };
    }
    case ActionType.DeleteRow: {
      const newData = data.filter(
        (d: any) => d[rowKeyField] !== actionData.rowKeyValue);
      return { ...state, data: newData };
    }
    case ActionType.SelectAllRows: {
      const newSelectedRows = data.map((d) => d[rowKeyField]);
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.SelectSingleRow: {
      const newSelectedRows = [actionData.rowKeyValue];
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.DeselectAllRows:
      return { ...state, selectedRows: [] };
    case ActionType.SelectRow:
        return { ...state, selectedRows: [...selectedRows, ...[actionData.rowKeyValue]] };
    case ActionType.DeselectRowData:
    case ActionType.DeselectRow: {
      const newSelectedRows = [...selectedRows].filter((s) => s !== actionData.rowKeyValue);
      return { ...state, selectedRows: newSelectedRows };
    }
    case ActionType.ChangeSorting:
      const sortedColumns = getSortedColumns(columns, actionData.column);
      return { ...state, columns: sortedColumns };
    case ActionType.ChangeVirtualScrollingHeightSettings:
      return { ...state, ...actionData };
    case ActionType.ScrollTable:
      if (virtualScrolling) {
          const scrollPosition = actionData.scrollTop;
          return {...state, ...{virtualScrolling: { ...virtualScrolling, scrollPosition }}};
        }
      break;
    case ActionType.UpdateGroupsExpanded:
      const newGroupsExpanded = updateExpandedGroups(
        groupsExpanded,
        actionData.groupKey,
      );
      return { ...state, groupsExpanded: newGroupsExpanded };
  }
  return state;
};

export {
  kaReducer,
};
