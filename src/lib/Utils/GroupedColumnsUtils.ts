import { Column } from '../models';
import { GroupedColumn } from '../Models/GroupedColumn';

interface GroupedColumnResult {
  colSpan: number;
  columnChainLength: number;
  column: Column,
  columns: Column[]
}

export const getChain = (column: Column | GroupedColumn, groupedColumns: GroupedColumn[], currentChain: (Column | GroupedColumn)[] = []): any[] => {
  const newChain = [column, ...currentChain];
  const groupedColumn = groupedColumns.find(gc => gc.columnsKeys.includes(column.key));
  if (groupedColumn) {
    return getChain(groupedColumn, groupedColumns, newChain);
  }
  return newChain;
}
export const addColumnToRows = (rows: GroupedColumnResult[][], column: Column, groupedColumns: GroupedColumn[]): GroupedColumnResult[][] => {
  const rowsResult: GroupedColumnResult[][] = [...rows];
  const columnsChain = getChain(column, groupedColumns);
  let isSameLast = true;
  columnsChain.forEach((item, index) => {
    if (!rowsResult[index]){
      rowsResult[index] = [];
    }
    const last = [...rowsResult[index]].pop();
    if (last && last.column === item){
      if (isSameLast){
        last.colSpan++;
        last.columns.push(column);
        return;
      }
      isSameLast = true;
    } else {
      isSameLast = false;
    }
    rowsResult[index].push({
      colSpan: 1,
      columnChainLength: columnsChain.length,
      column: item,
      columns: [column]
    });
  });
  return rowsResult;
};

export const getRowsWithGroupedColumns = (columns: Column[], groupedColumns: GroupedColumn[]): GroupedColumnResult[][] => {
  let rows: GroupedColumnResult[][] = [];
  columns.forEach(c => {
    rows = addColumnToRows(rows, c, groupedColumns);
  });
  rows.forEach((row, index) => {
    row.forEach((c: any) => {
      c.rowSpan = index === c.columnChainLength - 1 ? rows.length - c.columnChainLength + 1 : 1 ;
    });
  });
  return rows;
};
