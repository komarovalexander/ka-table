import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IHeadRowProps } from '../../props';
import { getRowsWithGroupedColumns } from '../../Utils/GroupedColumnsUtils';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

export const GroupedColumnsRow: React.FunctionComponent<IHeadRowProps> = (props) => {
  const {
    columns,
    groupedColumns = [],
  } = props
  const rows = getRowsWithGroupedColumns(columns, groupedColumns);
  const columnsKeys = columns.map(c => c.key);
  return (
    <>
      {rows.map((row, index) => (
      (
        <tr className={defaultOptions.css.theadRow} key={index}>
          <EmptyCells count={0} isTh={true}/>
          {row.map((item: any, columnIndex: number) => {
            return (
                <HeadCell
                  {...props}
                  colSpan={item.colSpan}
                  rowSpan={item.rowSpan}
                  column={item.column}
                  hasChildren={!columnsKeys.includes(item.column.key)}
                  isGrouped={true}
                  key={columnIndex}
                />
              );
          })}
        </tr>
      )))}
    </>
  );
};
