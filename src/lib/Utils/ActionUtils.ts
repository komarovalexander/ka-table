
import { ITableAllProps } from '../';
import { ActionType } from '../enums';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler } from './CellUtils';
import { updateExpandedGroups } from './GroupUtils';
import { getSortedColumns } from './HeadRowUtils';

export const wrapDispatch = (tableProps: ITableAllProps) => {
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
      case ActionType.OpenEditor:
        changeCellTextToCellEditorHandler(
          actionData.cell,
          editableCells,
          onOptionChange);
        break;
      case ActionType.CloseEditor:
        changeCellEditorToCellTextHandler(
          actionData.cell,
          editableCells,
          onOptionChange);
        break;
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
      case ActionType.ScrollTable:
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
