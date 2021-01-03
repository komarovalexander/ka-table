import React from 'react';

import { IFilterRowProps } from '../../props';
import { updateChildrenTop } from '../../Utils/DomUtils';
import EmptyCells from '../EmptyCells/EmptyCells';
import FilterCell from '../FilterCell/FilterCell';

const FilterRow: React.FunctionComponent<IFilterRowProps> = ({
  childComponents,
  columns,
  dispatch,
  groupColumnsCount,
}) => {
  const elementRef = React.useRef<any>(null);
  React.useEffect(() => {
    updateChildrenTop(elementRef);
  }, [elementRef]);
  return (
    <tr className='ka-filter-row ka-tr' ref={elementRef}>
      <EmptyCells count={groupColumnsCount} isTh={true}/>
      {columns.map((column) => {
        return (
          <FilterCell
            key={column.key}
            column={column}
            childComponents={childComponents}
            dispatch={dispatch}
          />
        );
      })}
    </tr>
  );
};

export default FilterRow;
