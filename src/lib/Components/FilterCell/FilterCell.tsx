import * as React from 'react';

import { getElementCustomization } from '../../Utils/ComponentUtils';
import { IFilterRowEditorProps } from '../CellEditor/CellEditor';
import FilterRowDataType from '../FilterRowDataType/FilterRowDataType';

const FilterCell: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
  const {
    childComponents,
    column: { style },
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: 'ka-thead-cell ka-filter-row-cell',
    style
  }, props, childComponents.filterRowCell);

  return (
    <td {...elementAttributes}>
      {
        content ? content :
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
