import React from 'react';

import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import EmptyCells from '../EmptyCells/EmptyCells';
import FilterCell from '../FilterCell/FilterCell';

export interface IFilterRowProps {
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  groupColumnsCount: number;
}

const FilterRow: React.FunctionComponent<IFilterRowProps> = ({
  childComponents,
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
            childComponents={childComponents}
            dispatch={dispatch}
          />
        );
      })}
    </tr>
  );
};

export default FilterRow;
