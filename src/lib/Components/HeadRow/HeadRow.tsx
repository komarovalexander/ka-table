import React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortingMode } from '../../enums';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

export interface IHeadRowProps {
  areAllRowsSelected: boolean;
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  groupColumnsCount: number;
  sortingMode: SortingMode;
}

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({
  areAllRowsSelected,
  childComponents,
  columns,
  dispatch,
  groupColumnsCount,
  sortingMode,
}) => {
  return (
    <tr className={defaultOptions.css.theadRow}>
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
