
import { ITableAllProps } from '../';
import { Events } from '../enums';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler } from './CellUtils';
import { getSortedColumns } from './HeadRowUtils';

export const getOnEventHandler = ({
  columns,
  data,
  editableCells = [],
  onDataChange = () => {},
  onEvent = () => {},
  onOptionChange,
  rowKeyField,
  selectedRows = [],
  virtualScrolling,
}: ITableAllProps) => {
  return (event: string, eventData: any) => {
    switch (event) {
      case Events.OpenEditor:
        changeCellTextToCellEditorHandler(
          eventData.cell,
          editableCells,
          onOptionChange);
        break;
      case Events.CloseEditor:
        changeCellEditorToCellTextHandler(
          eventData.cell,
          editableCells,
          onOptionChange);
        break;
      case Events.RowDataChanged:
          const newData = getCopyOfArrayAndInsertOrReplaceItem(eventData.newValue, rowKeyField, data);
          onDataChange(newData);
          break;
      case Events.RowSelected:
          onOptionChange({ selectedRows: [...selectedRows, ...[eventData.rowKeyValue]] });
          break;
      case Events.RowDeselected:
          onOptionChange({ selectedRows: [...selectedRows].filter((s) => s !== eventData.rowKeyValue) });
          break;
      case Events.SortingChanged:
          const sortedColumns = getSortedColumns(columns, eventData.column);
          onOptionChange({ columns: sortedColumns });
          break;
      case Events.ScrollTable:
          if (virtualScrolling) {
            const scrollPosition = eventData.scrollTop;
            if (virtualScrolling) {
              onOptionChange({ virtualScrolling: { ...virtualScrolling, scrollPosition }});
            }
          }
          break;
    }
    onEvent(event, eventData);
  };
};
