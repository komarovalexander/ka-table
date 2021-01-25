import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { FilteringMode } from '../../enums';
import { ITableHeadProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import FilterRow from '../FilterRow/FilterRow';
import HeadRow from '../HeadRow/HeadRow';

export const TableHead: React.FunctionComponent<ITableHeadProps> = (props) => {
  const {
    childComponents,
    filteringMode,
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.thead,
  }, props, childComponents.tableHead);
  return (
    <thead {...elementAttributes}>
      {content || (
        <>
          <HeadRow {...props} />
          {filteringMode === FilteringMode.FilterRow &&
            (
              <FilterRow {...props} />
            )}
        </>
      )}
    </thead>
  );
};
