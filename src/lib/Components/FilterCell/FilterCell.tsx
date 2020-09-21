import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IFilterRowEditorProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateElementTop } from '../../Utils/DomUtils';
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

  const elementRef = React.useRef<any>(null);
  React.useEffect(() => {
    updateElementTop(elementRef);
  }, [elementRef]);
  return (
    <td {...elementAttributes} ref={elementRef}>
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
