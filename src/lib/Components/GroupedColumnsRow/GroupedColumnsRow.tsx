import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { Column } from '../../models';
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
  return (
    <>
      {rows.map((row, index) => (
      (
        <tr className={defaultOptions.css.theadRow} key={index}>
          <EmptyCells count={0} isTh={true}/>
          {row.map((item: any, columnIndex: number) => {
            // TODO: try colgroup to avoid additional calculation
            const width = item.columns.reduce((acc: number, value: Column) => {
              return acc + (value?.style?.width as number ?? 0);
            }, 0);
            return (
                <HeadCell
                  {...props}
                  colSpan={item.colSpan}
                  rowSpan={item.rowSpan}
                  column={{
                    ...item.column,
                    style: {
                      ...item.column.style,
                      width
                    }
                  }}
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
