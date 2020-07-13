import * as React from 'react';

import { IFilterRowEditorProps } from '../CellEditor/CellEditor';
import FilterRowDataType from '../FilterRowDataType/FilterRowDataType';

const FilterCell: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
  const {
    childComponents: {filterRowCell},
    column: { style },
  } = props;
  const filterRowCellContent = filterRowCell && filterRowCell.content && filterRowCell.content(props);
  return (
    <td style={style} className='ka-thead-cell ka-filter-row-cell'>
      {
        filterRowCellContent ? filterRowCellContent :
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
