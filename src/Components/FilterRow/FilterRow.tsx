import React from 'react';

import { Column } from '../../Models/Column';
import emptyFunc from '../../Models/EmptyFunc';
import { FilterRowItem } from '../../Models/FilterRowItem';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { filterCellValueChangeHandler } from '../../Utils/FilterUtils';
import FilterCell from '../FilterCell/FilterCell';

export interface IFilterRowProps {
  columns: Column[];
  filterRow: FilterRowItem[];
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
            rowData={rowData}
            close={emptyFunc}
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
