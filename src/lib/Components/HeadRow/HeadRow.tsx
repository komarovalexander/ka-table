import React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { EventFunc } from '../../types';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

export interface IHeadRowProps {
  columns: Column[];
  sortingMode: SortingMode;
  groupColumnsCount: number;
  onEvent: EventFunc;
}

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({
  columns,
  groupColumnsCount,
  onEvent,
  sortingMode,
}) => {
  return (
    <tr className={defaultOptions.css.theadRow}>
      <EmptyCells count={groupColumnsCount}/>
      {columns.map((column) => {
        return (
          <HeadCell
            key={column.key}
            column={column}
            onEvent={onEvent}
            sortingMode={sortingMode}
          />
        );
      })}
    </tr>
  );
};

export default HeadRow;
