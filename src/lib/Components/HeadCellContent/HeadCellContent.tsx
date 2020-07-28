import * as React from 'react';

import { kaDefaultOptions } from '../../';
import { updateSortDirection } from '../../actionCreators';
import { SortDirection } from '../../enums';
import { IHeadCellProps } from '../../props';
import { isSortingEnabled } from '../../Utils/SortUtils';

const HeadCellContent: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column,
    dispatch,
    sortingMode
  } = props;
  const sortingEnabled = isSortingEnabled(sortingMode);
  const sortClick = sortingEnabled ? () => {
    dispatch(updateSortDirection(column.key));
  } : undefined;
  return (
    <div
      className={`${kaDefaultOptions.css.theadCellContent} ${sortingEnabled ? 'ka-pointer' : ''}`}
      onClick={sortClick}>
      <span>{column.title}</span>
      {column.sortDirection && sortingEnabled && (
        <span
          className={
            column.sortDirection === SortDirection.Ascend
              ? kaDefaultOptions.css.iconSortArrowUp
              : kaDefaultOptions.css.iconSortArrowDown
          }
        />
      )}
    </div>
  );
};

export default HeadCellContent;
