
import { RefObject } from 'react';

import { ITableAllProps } from '../';
import { ActionType } from '../enums';
import { OptionChangeFunc } from '../types';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { addItemToEditableCells, removeItemFromEditableCells } from './CellUtils';
import { updateExpandedGroups } from './GroupUtils';
import { getSortedColumns } from './HeadRowUtils';

export const wrapDispatch = (
  tableProps: ITableAllProps,
  theadRef?: RefObject<HTMLTableSectionElement>,
  onOptionChange: OptionChangeFunc = () => {}) => {
  const {
    columns,
    data = [],
    editableCells = [],
    groupsExpanded = [],
    onDataChange = () => {},
    onEvent = () => {},
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
          onOptionChange({ data: newData });
          onDataChange(newData);
          break;
      case ActionType.SelectAllRows: {
        const newSelectedRows = data.map((d) => d[rowKeyField]);
        onOptionChange({ selectedRows: newSelectedRows });
        break;
      }
      case ActionType.SelectSingleRow: {
        const newSelectedRows = [actionData.rowKeyValue];
        onOptionChange({ selectedRows: newSelectedRows });
        break;
      }
      case ActionType.DeselectAllRows:
        onOptionChange({ selectedRows: [] });
        break;
      case ActionType.SelectRow:
          onOptionChange({ selectedRows: [...selectedRows, ...[actionData.rowKeyValue]] });
          break;
      case ActionType.DeselectRowData:
      case ActionType.DeselectRow:
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
        if (theadRef && theadRef.current) {
          theadRef.current.scrollTo({ left: actionData.scrollLeft});
        }
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
