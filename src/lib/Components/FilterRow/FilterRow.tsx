import EmptyCells from '../EmptyCells/EmptyCells';
import FilterCell from '../FilterCell/FilterCell';
import { IFilterRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';

const FilterRow: React.FunctionComponent<IFilterRowProps> = ({
  childComponents,
  columns,
  dispatch,
  groupColumnsCount,
}) => {
  return (
    <tr className={`ka-filter-row ${defaultOptions.css.theadRow} ka-tr`}>
      <EmptyCells count={groupColumnsCount} isTh={true} childComponents={childComponents}/>
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
