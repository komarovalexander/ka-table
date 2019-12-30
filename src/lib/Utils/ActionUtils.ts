
import { ITableAllProps } from '../';
import { Action } from '../enums';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler } from './CellUtils';
import { getSortedColumns } from './HeadRowUtils';

export const wrapDispatch = ({
  columns,
  data,
  editableCells = [],
  onDataChange = () => {},
  onActionExecuted = () => {},
  onOptionChange,
  rowKeyField,
  selectedRows = [],
  virtualScrolling,
}: ITableAllProps) => {
  return (action: string, actionData: any) => {
    switch (action) {
      case Action.OpenEditor:
        changeCellTextToCellEditorHandler(
          actionData.cell,
          editableCells,
          onOptionChange);
        break;
      case Action.CloseEditor:
        changeCellEditorToCellTextHandler(
          actionData.cell,
          editableCells,
          onOptionChange);
        break;
      case Action.ChangeFilterRow:
          const newColumns = getCopyOfArrayAndInsertOrReplaceItem(actionData.column, 'key', columns);
          onOptionChange({ columns: newColumns });
          break;
      case Action.ChangeRowData:
          const newData = getCopyOfArrayAndInsertOrReplaceItem(actionData.newValue, rowKeyField, data);
          onDataChange(newData);
          break;
      case Action.SelectRow:
          onOptionChange({ selectedRows: [...selectedRows, ...[actionData.rowKeyValue]] });
          break;
      case Action.DeselectRowData:
          onOptionChange({ selectedRows: [...selectedRows].filter((s) => s !== actionData.rowKeyValue) });
          break;
      case Action.ChangeSorting:
          const sortedColumns = getSortedColumns(columns, actionData.column);
          onOptionChange({ columns: sortedColumns });
          break;
      case Action.ScrollTable:
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
