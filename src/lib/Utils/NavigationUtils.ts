import { ITableProps } from '../Components/Table/Table';
import { Cell } from '../Models/Cell';
import { getValueByField } from './DataUtils';
import { getData } from './PropsUtils';

export interface IMoveFocusedSettingsBase {
  end?: boolean
}
export interface IMoveFocusedSettings extends IMoveFocusedSettingsBase {
  nextRow?: boolean,
}

export const getRightCell = (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings): Cell => {
  let nextColumnKey: string;
  let hasNextColumn = true;

  if (settings?.end) {
    nextColumnKey = props.columns[props.columns.length - 1]?.key;
  } else {
    const columnIndex = props.columns.findIndex(c => c.key === currentCell.columnKey);
    hasNextColumn = columnIndex < props.columns.length - 1;
    nextColumnKey = hasNextColumn
      ? props.columns[columnIndex + 1].key
      : settings?.nextRow
        ? props.columns[0].key
        : currentCell.columnKey;
  }

  let rowKeyValue = currentCell.rowKeyValue;
  if (settings?.nextRow && !hasNextColumn){
    const visibleData = getData(props);
    const rowIndex = visibleData?.findIndex(d => getValueByField(d, props.rowKeyField) === currentCell.rowKeyValue);
    if (rowIndex < visibleData.length - 1){
      const nextRow = visibleData[rowIndex + 1];
      rowKeyValue = getValueByField(nextRow, props.rowKeyField);
    } else {
      return currentCell;
    }
  }
  return { columnKey: nextColumnKey, rowKeyValue };
}

export const getLeftCell = (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettings): Cell => {
  let nextColumnKey: string;
  let hasNextColumn = true;

  if (settings?.end) {
    nextColumnKey = props.columns[0]?.key;
  } else {
    const columnIndex = props.columns.findIndex(c => c.key === currentCell.columnKey);
    hasNextColumn = 0 < columnIndex;
    nextColumnKey = hasNextColumn
      ? props.columns[columnIndex - 1].key
      : settings?.nextRow
        ? props.columns[props.columns.length - 1].key
        : currentCell.columnKey;
  }
  let rowKeyValue = currentCell.rowKeyValue;
  if (settings?.nextRow && !hasNextColumn){
    const visibleData = getData(props);
    const rowIndex = visibleData?.findIndex(d => getValueByField(d, props.rowKeyField) === currentCell.rowKeyValue);
    if (rowIndex > 0){
      const nextRow = visibleData[rowIndex - 1];
      rowKeyValue = getValueByField(nextRow, props.rowKeyField);
    } else {
      return currentCell;
    }
  }
  return { columnKey: nextColumnKey, rowKeyValue };
}

export const getUpCell = (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettingsBase): Cell => {
  let rowKeyValue = currentCell.rowKeyValue;
  const visibleData = getData(props);
  if (settings?.end) {
    const nextRow = visibleData[0];
    rowKeyValue = getValueByField(nextRow, props.rowKeyField);
  } else {
    const rowIndex = visibleData?.findIndex(d => getValueByField(d, props.rowKeyField) === currentCell.rowKeyValue);
    if (rowIndex > 0){
      const nextRow = visibleData[rowIndex - 1];
      rowKeyValue = getValueByField(nextRow, props.rowKeyField);
    }
  }
  return { columnKey: currentCell.columnKey, rowKeyValue };
}

export const getDownCell = (currentCell: Cell, props: ITableProps, settings?: IMoveFocusedSettingsBase): Cell => {
  let rowKeyValue = currentCell.rowKeyValue;
  const visibleData = getData(props);
  if (settings?.end) {
    const nextRow = visibleData[visibleData.length - 1];
    rowKeyValue = getValueByField(nextRow, props.rowKeyField);
  } else {
    const rowIndex = visibleData?.findIndex(d => getValueByField(d, props.rowKeyField) === currentCell.rowKeyValue);
    if (rowIndex < visibleData.length - 1){
      const nextRow = visibleData[rowIndex + 1];
      rowKeyValue = getValueByField(nextRow, props.rowKeyField);
    }
  }
  return { columnKey: currentCell.columnKey, rowKeyValue };
}