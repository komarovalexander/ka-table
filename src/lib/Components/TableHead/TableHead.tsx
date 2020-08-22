import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { FilteringMode } from '../../enums';
import { ITableHeadProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import FilterRow from '../FilterRow/FilterRow';
import HeadRow from '../HeadRow/HeadRow';

export const TableHead: React.FunctionComponent<ITableHeadProps> = (props) => {
  const {
    areAllRowsSelected,
    childComponents,
    columnReordering,
    columns,
    dispatch,
    filteringMode,
    groupColumnsCount,
    sortingMode,
    theadRef,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.thead,
  }, { ...props, dispatch }, childComponents.tableHead);
  return (
    <thead {...elementAttributes} ref={theadRef}>
      {content || (
        <>
          <HeadRow
            areAllRowsSelected={areAllRowsSelected}
            childComponents={childComponents}
            columnReordering={columnReordering}
            columns={columns}
            dispatch={dispatch}
            groupColumnsCount={groupColumnsCount}
            sortingMode={sortingMode}
          />
          {filteringMode === FilteringMode.FilterRow &&
            (
              <FilterRow
                childComponents={childComponents}
                columns={columns}
                dispatch={dispatch}
                groupColumnsCount={groupColumnsCount}
              />
            )}
        </>
      )}
    </thead>
  );
};
