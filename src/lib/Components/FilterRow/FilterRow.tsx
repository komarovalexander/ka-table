import React from 'react';

import emptyFunc from '../../emptyFunc';
import { Column } from '../../Models/Column';
import { FilterCondition } from '../../Models/FilterCondition';
import { OptionChangedFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
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
    <tr className='ka-filter-row ka-tr'>
      {columns.map((column) => {
        return (
          <FilterCell
            key={column.key}
            column={column}
            field={getField(column)}
            rowKeyField={''}
            isSelectedRow={false}
            dispatch={emptyFunc}
            rowData={rowData}
            onValueChange={(value) => {
              filterCellValueChangeHandler(value, column.key, filterRow, onOptionChanged);
            }}
          />
        );
      })}
    </tr>
  );
};

export default FilterRow;
