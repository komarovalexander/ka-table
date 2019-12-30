import * as React from 'react';

import { IFilterRowEditor } from '../CellEditor/CellEditor';
import FilterRowDataType from '../FilterRowDataType/FilterRowDataType';

const FilterCell: React.FunctionComponent<IFilterRowEditor> = (props) => {
  const {
    column: { style, filterRowCell },
  } = props;
  return (
    <td style={style} className='ka-thead-cell ka-filter-row-cell'>
      {
        filterRowCell ? filterRowCell(props) :
        (
          <FilterRowDataType
            {...props}
          />
        )
      }
    </td>
  );
};

export default FilterCell;
