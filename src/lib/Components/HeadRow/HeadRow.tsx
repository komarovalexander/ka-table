import React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

export interface IHeadRowProps {
  columns: Column[];
  sortingMode: SortingMode;
  groupColumnsCount: number;
  dispatch: DispatchFunc;
}

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({
  columns,
  groupColumnsCount,
  dispatch,
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
            dispatch={dispatch}
            sortingMode={sortingMode}
          />
        );
      })}
    </tr>
  );
};

export default HeadRow;
