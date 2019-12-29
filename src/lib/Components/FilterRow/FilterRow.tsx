import React from 'react';

import emptyFunc from '../../emptyFunc';
import { Events } from '../../enums';
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
  const filterRowData = columns.reduce((prevValue: any, column, i, array) => {
    prevValue[column.key] = column.filterRowValue;
    return prevValue;
  }, {});
  return (
    <tr className='ka-filter-row ka-tr'>
      <EmptyCells count={groupColumnsCount}/>
      {columns.map((column) => {
        return (
          <FilterCell
            key={column.key}
            column={column}
            field={getField(column)}
            rowKeyField={''}
            isSelectedRow={false}
            dispatch={emptyFunc}
            rowData={filterRowData}
            onValueChange={(filterRowValue) => {
              const updatedColumn = {...column, filterRowValue};
              dispatch(Events.FilterRowChanged, { column: updatedColumn });
            }}
          />
        );
      })}
    </tr>
  );
};

export default FilterRow;
