import React from 'react';

import emptyFunc from '../../emptyFunc';
import { Column } from '../../Models/Column';
import { FilterCondition } from '../../Models/FilterCondition';
import { OptionChangedFunc } from '../../types';
import { filterCellValueChangeHandler } from '../../Utils/FilterUtils';
import FilterCell from '../FilterCell/FilterCell';

export interface IFilterRowProps {
  columns: Column[];
  filterRow: FilterCondition[];
  onOptionChanged: OptionChangedFunc;
}

const FilterRow: React.FunctionComponent<IFilterRowProps> = ({
  columns,
  filterRow,
  onOptionChanged,
}) => {
  const rowData = filterRow.reduce((c: any, f, i, array) => {
    c[f.field] = f.value;
    return c;
  }, {});
  return (
    <tr className='tc-filter-row'>
      {columns.map((column) => {
        return (
          <FilterCell
            key={column.field}
            column={column}
            rowKey={''}
            onEvent={emptyFunc}
            rowData={rowData}
            onValueChange={(value) => {
              filterCellValueChangeHandler(value, column.field, filterRow, onOptionChanged);
            }}
          />
        );
      })}
    </tr>
  );
};

export default FilterRow;
