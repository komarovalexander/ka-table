
import { ITableAllProps } from '../';
import { Events } from '../enums';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler } from './CellUtils';
import { getSortedColumns } from './HeadRowUtils';

export const getOnEventHandler = ({
  columns,
  data,
  editableCells = [],
  onDataChanged = () => {},
  onEvent = () => {},
  onOptionChanged,
  rowKeyField,
  selectedRows = [],
}: ITableAllProps) => {
  return (event: string, eventData: any) => {
    switch (event) {
      case Events.OpenEditor:
        changeCellTextToCellEditorHandler(
          eventData.cell,
          editableCells,
          onOptionChanged);
        break;
      case Events.CloseEditor:
        changeCellEditorToCellTextHandler(
          eventData.cell,
          editableCells,
          onOptionChanged);
        break;
      case Events.RowDataChanged:
          const newData = getCopyOfArrayAndInsertOrReplaceItem(eventData.rowData, rowKeyField, data);
          onDataChanged(newData);
          break;
      case Events.RowSelected:
          onOptionChanged({ selectedRows: [...selectedRows, ...[eventData.rowKeyValue]] });
          break;
      case Events.RowDeselected:
          onOptionChanged({ selectedRows: [...selectedRows].filter((s) => s !== eventData.rowKeyValue) });
          break;
      case Events.SortingChanged:
          const sortedColumns = getSortedColumns(columns, eventData.column);
          onOptionChanged({ columns: sortedColumns });
          break;
    }
    onEvent(event, eventData);
  };
};
