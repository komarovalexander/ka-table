import React from 'react';

import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import EmptyCells from '../EmptyCells/EmptyCells';
import FilterCell from '../FilterCell/FilterCell';

export interface IFilterRowProps {
  columns: Column[];
  dispatch: DispatchFunc;
  groupColumnsCount: number;
}

const FilterRow: React.FunctionComponent<IFilterRowProps> = ({
  columns,
  dispatch,
  groupColumnsCount,
}) => {
  return (
    <tr className='ka-filter-row ka-tr'>
      <EmptyCells count={groupColumnsCount}/>
      {columns.map((column) => {
        return (
          <FilterCell
            key={column.key}
            column={column}
            dispatch={dispatch}
          />
        );
      })}
    </tr>
  );
};

export default FilterRow;
