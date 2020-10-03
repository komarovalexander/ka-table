import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { Column } from '../../models';
import { GroupedColumn } from '../../Models/GroupedColumn';
import { IHeadRowProps } from '../../props';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

const getChain = (column: Column | GroupedColumn, groupedColumns: GroupedColumn[], currentChain: (Column | GroupedColumn)[] = []): any[] => {
  const newChain = [column, ...currentChain];
  const groupedColumn = groupedColumns.find(gc => gc.columnsKeys.includes(column.key));
  if (groupedColumn) {
    return getChain(groupedColumn, groupedColumns, newChain);
  }
  return newChain;
}
const addColumnToRows = (rows: any[], column: any, groupedColumns: GroupedColumn[]) => {
  const columnsChain = getChain(column, groupedColumns);
  columnsChain.forEach((item, index) => {
    if (!rows[index]){
      rows[index] = [];
    }
    const last = [...rows[index]].pop();
    if (last && last.column === item){
      last.colSpan++;
    } else {
      rows[index].push({
        colSpan: 1,
        columnChainLength: columnsChain.length,
        column: item
      });
    }
  });
};

export const GroupedColumnsRow: React.FunctionComponent<IHeadRowProps> = (props) => {
  const {
    columns,
    groupedColumns = [],
  } = props;
  if (!groupedColumns.length){
    return <></>;
  }

  const rows: any[] = [];
  columns.forEach(c => {
    addColumnToRows(rows, c, groupedColumns);
  });
  rows.forEach((row, index) => {
    row.forEach((c: any) => {
      c.rowSpan = index === c.columnChainLength - 1 ? rows.length - c.columnChainLength + 1 : 1 ;
    });
  })
  return (
    <>
      {rows.map((row, index) => (
      (
        <tr className={defaultOptions.css.theadRow} key={index}>
          <EmptyCells count={0} isTh={true}/>
          {row.map((item: any, columnIndex: number) => {
            if (columns.some(c => c.key === item.column.key)){
              return (
                <HeadCell
                  {...props}
                  colSpan={item.colSpan}
                  rowSpan={item.rowSpan}
                  column={item.column}
                  key={columnIndex}
                />
              );
            } else {
              return (
                <th colSpan={item.colSpan} rowSpan={item.rowSpan} key={columnIndex}>{item.column.title}</th>
              );
            }
          })}
        </tr>
      )))}
    </>
  );
};
