import * as React from 'react';

import { updateSortDirection } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
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
      className={`${defaultOptions.css.theadCellContent} ${sortingEnabled ? 'ka-pointer' : ''}`}
      onClick={sortClick}>
      <span>{column.title}</span>
      {column.sortDirection && sortingEnabled && (
        <span
          className={
            column.sortDirection === SortDirection.Ascend
              ? defaultOptions.css.iconSortArrowUp
              : defaultOptions.css.iconSortArrowDown
          }
        />
      )}
    </div>
  );
};

export default HeadCellContent;
