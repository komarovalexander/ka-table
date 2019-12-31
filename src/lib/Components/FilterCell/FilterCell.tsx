import * as React from 'react';

import { IFilterRowEditorProps } from '../CellEditor/CellEditor';
import FilterRowDataType from '../FilterRowDataType/FilterRowDataType';

const FilterCell: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
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
