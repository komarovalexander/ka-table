
import { RefObject } from 'react';

import { ITableAllProps } from '../';
import { ActionType } from '../enums';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from './CellUtils';
import { updateExpandedGroups } from './GroupUtils';
import { getSortedColumns } from './HeadRowUtils';

export const wrapDispatch = (tableProps: ITableAllProps, theadRef: RefObject<HTMLTableSectionElement>) => {
  const {
    columns,
    data,
    editableCells = [],
    groupsExpanded = [],
    onDataChange = () => {},
    onEvent = () => {},
    onOptionChange,
    rowKeyField,
    selectedRows = [],
    virtualScrolling,
  } = tableProps;
  return (action: string, actionData: any) => {
    switch (action) {
      case ActionType.OpenEditor: {
        const newEditableCells = addItemToEditableCells(
          actionData.cell,
          editableCells);
        onOptionChange({ editableCells: newEditableCells });
        break;
      }
      case ActionType.CloseEditor: {
        const newEditableCells = removeItemFromEditableCells(
          actionData.cell,
          editableCells);
        onOptionChange({ editableCells: newEditableCells });
        break;
      }
      case ActionType.ChangeFilterRow:
          const newColumns = getCopyOfArrayAndInsertOrReplaceItem(actionData.column, 'key', columns);
          onOptionChange({ columns: newColumns });
          break;
      case ActionType.ChangeRowData:
          const newData = getCopyOfArrayAndInsertOrReplaceItem(actionData.newValue, rowKeyField, data);
          onDataChange(newData);
          break;
      case ActionType.SelectRow:
          onOptionChange({ selectedRows: [...selectedRows, ...[actionData.rowKeyValue]] });
          break;
      case ActionType.DeselectRowData:
          onOptionChange({ selectedRows: [...selectedRows].filter((s) => s !== actionData.rowKeyValue) });
          break;
      case ActionType.ChangeSorting:
          const sortedColumns = getSortedColumns(columns, actionData.column);
          onOptionChange({ columns: sortedColumns });
          break;
      case ActionType.ChangeVirtualScrollingHeightSettings:
          onOptionChange(actionData);
          break;
      case ActionType.ScrollTable:
        theadRef.current?.scrollTo({ left: actionData.scrollLeft});
        if (virtualScrolling) {
            const scrollPosition = actionData.scrollTop;
            if (virtualScrolling) {
              onOptionChange({ virtualScrolling: { ...virtualScrolling, scrollPosition }});
            }
          }
        break;
      case ActionType.UpdateGroupsExpanded:
        const newGroupsExpanded = updateExpandedGroups(
          groupsExpanded,
          actionData.groupKey,
        );
        actionData.newValue = { groupsExpanded: newGroupsExpanded }; // BC
        onOptionChange({ groupsExpanded: newGroupsExpanded });
        break;
    }
    onEvent(action, actionData);
  };
};
