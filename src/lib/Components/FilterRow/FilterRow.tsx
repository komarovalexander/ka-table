import React from 'react';

import { Column } from '../../Models/Column';
import { EventFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
import EmptyCells from '../EmptyCells/EmptyCells';
import FilterCell from '../FilterCell/FilterCell';

export interface IFilterRowProps {
  columns: Column[];
  dispatch: EventFunc;
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
            field={getField(column)}
            dispatch={dispatch}
          />
        );
      })}
    </tr>
  );
};

export default FilterRow;
