
import { ITableAllProps } from '../';
import { Events } from '../enums';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler } from './CellUtils';
import { sortUtilsClickHandler } from './HeadRowUtils';

export const getOnEventHandler = ({
  columns,
  data,
  editableCells = [],
  onDataChanged = () => {},
  onEvent = () => {},
  onOptionChanged,
  rowKey,
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
          const newData = getCopyOfArrayAndInsertOrReplaceItem(eventData.rowData, rowKey, data);
          onDataChanged(newData);
          break;
      case Events.RowSelected:
          onOptionChanged({ selectedRows: [...selectedRows, ...[eventData.rowKeyValue]] });
          break;
      case Events.RowDeselected:
          onOptionChanged({ selectedRows: [...selectedRows].filter((s) => s !== eventData.rowKeyValue) });
          break;
      case Events.SortingChanged:
          sortUtilsClickHandler(columns, eventData.column, onOptionChanged);
          break;
    }
    onEvent(event, eventData);
  };
};
