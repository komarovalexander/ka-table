
import { ITableAllProps } from '../';
import { ActionType } from '../enums';
import { ActionCommand } from '../Models/ActionCommand';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler } from './CellUtils';
import { getSortedColumns } from './HeadRowUtils';

export const wrapDispatch = ({
  columns,
  data,
  editableCells = [],
  onActionExecute = () => {},
  onActionExecuted = () => {},
  onActionRejected = () => {},
  onDataChange = () => {},
  onOptionChange,
  rowKeyField,
  selectedRows = [],
  virtualScrolling,
}: ITableAllProps) => {
  return (action: string, actionData: any) => {
    const actionCommand = new ActionCommand();
    onActionExecute(action, actionData, actionCommand);
    if (actionCommand.rejected) {
      onActionRejected(action, actionData, actionCommand);
      return;
    }
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
    }
    onActionExecuted(action, actionData);
  };
};
