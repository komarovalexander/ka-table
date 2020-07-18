import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { FilteringMode, SortingMode } from '../../enums';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import FilterRow from '../FilterRow/FilterRow';
import HeadRow from '../HeadRow/HeadRow';

export interface ITableHeadProps {
  areAllRowsSelected: boolean;
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  filteringMode: FilteringMode;
  groupColumnsCount: number;
  sortingMode: SortingMode;
  theadRef: any;
}

export const TableHead: React.FunctionComponent<ITableHeadProps> = (props) => {
  const {
    areAllRowsSelected,
    childComponents,
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
