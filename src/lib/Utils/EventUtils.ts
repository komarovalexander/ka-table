
import { ITableAllProps } from '../';
import { Events } from '../enums';
import { getCopyOfArrayAndInsertOrReplaceItem } from './ArrayUtils';
import { changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler } from './CellUtils';

export const getOnEventHandler = ({
  data,
  editableCells = [],
  onOptionChanged,
  rowKey,
  onEvent = () => {},
  onDataChanged = () => {},
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
    }
    onEvent(event, eventData);
  };
};
