
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
  return (event: string, eventData: any) => {
    switch (event) {
      case Action.OpenEditor:
        changeCellTextToCellEditorHandler(
          eventData.cell,
          editableCells,
          onOptionChange);
        break;
      case Action.CloseEditor:
        changeCellEditorToCellTextHandler(
          eventData.cell,
          editableCells,
          onOptionChange);
        break;
      case Action.ChangeFilterRow:
          const newColumns = getCopyOfArrayAndInsertOrReplaceItem(eventData.column, 'key', columns);
          onOptionChange({ columns: newColumns });
          break;
      case Action.ChangeRowData:
          const newData = getCopyOfArrayAndInsertOrReplaceItem(eventData.newValue, rowKeyField, data);
          onDataChange(newData);
          break;
      case Action.SelectRow:
          onOptionChange({ selectedRows: [...selectedRows, ...[eventData.rowKeyValue]] });
          break;
      case Action.DeselectRowData:
          onOptionChange({ selectedRows: [...selectedRows].filter((s) => s !== eventData.rowKeyValue) });
          break;
      case Action.ChangeSorting:
          const sortedColumns = getSortedColumns(columns, eventData.column);
          onOptionChange({ columns: sortedColumns });
          break;
      case Action.ScrollTable:
          if (virtualScrolling) {
            const scrollPosition = eventData.scrollTop;
            if (virtualScrolling) {
              onOptionChange({ virtualScrolling: { ...virtualScrolling, scrollPosition }});
            }
          }
          break;
    }
    onActionExecuted(event, eventData);
  };
};
