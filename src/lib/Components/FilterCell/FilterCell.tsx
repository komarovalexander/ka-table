import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IFilterRowEditorProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import FilterRowDataType from '../FilterRowDataType/FilterRowDataType';

const FilterCell: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
  const {
    childComponents,
    column: { style },
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.theadCell} ka-filter-row-cell ${defaultOptions.css.theadBackground}`,
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
