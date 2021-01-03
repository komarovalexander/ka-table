import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { FilteringMode } from '../../enums';
import { ITableHeadProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import FilterRow from '../FilterRow/FilterRow';
import { GroupedColumnsRow } from '../GroupedColumnsRow/GroupedColumnsRow';
import HeadRow from '../HeadRow/HeadRow';

export const TableHead: React.FunctionComponent<ITableHeadProps> = (props) => {
  const {
    childComponents,
    dispatch,
    filteringMode,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.thead,
  }, { ...props, dispatch }, childComponents.tableHead);
  return (
    <thead {...elementAttributes}>
      {content || (
        <>
          <GroupedColumnsRow {...props} />
          {filteringMode === FilteringMode.FilterRow &&
            (
              <FilterRow
                {...props}
                dispatch={dispatch}
              />
            )}
        </>
      )}
    </thead>
  );
};
