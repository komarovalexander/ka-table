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
    columnResizing,
    columns,
    dispatch,
    filteringMode,
    groupColumnsCount,
    sortingMode,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.thead,
  }, { ...props, dispatch }, childComponents.tableHead);
  return (
    <thead {...elementAttributes}>
      {content || (
        <>
          <HeadRow
            areAllRowsSelected={areAllRowsSelected}
            childComponents={childComponents}
            columnReordering={columnReordering}
            columnResizing={columnResizing}
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
