import React from 'react';

import { kaDefaultOptions } from '../../';
import { IHeadRowProps } from '../../props';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({
  areAllRowsSelected,
  childComponents,
  columns,
  dispatch,
  groupColumnsCount,
  sortingMode,
}) => {
  return (
    <tr className={kaDefaultOptions.css.theadRow}>
      <EmptyCells count={groupColumnsCount}/>
      {columns.map((column) => {
        return (
          <HeadCell
            areAllRowsSelected={areAllRowsSelected}
            childComponents={childComponents}
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
