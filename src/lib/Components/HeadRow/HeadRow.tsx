import React from 'react';

import defaultOptions from '../../defaultOptions';
import { IHeadRowProps } from '../../props';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({
  areAllRowsSelected,
  childComponents,
  columnReordering,
  columnResizing,
  columns,
  dispatch,
  groupColumnsCount,
  sortingMode,
}) => {
  return (
    <tr className={defaultOptions.css.theadRow}>
      <EmptyCells count={groupColumnsCount} isTh={true}/>
      {columns.map((column) => {
        return (
          <HeadCell
            areAllRowsSelected={areAllRowsSelected}
            childComponents={childComponents}
            columnReordering={columnReordering}
            columnResizing={columnResizing}
            column={column}
            dispatch={dispatch}
            key={column.key}
            sortingMode={sortingMode}
          />
        );
      })}
    </tr>
  );
};

export default HeadRow;
