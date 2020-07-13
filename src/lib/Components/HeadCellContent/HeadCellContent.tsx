import * as React from 'react';

import { updateSortDirection } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { SortDirection, SortingMode } from '../../enums';
import { IHeadCellProps } from '../HeadCell/HeadCell';

const HeadCellContent: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    childComponents: { headCell },
  } = props;
  const headCellContent = headCell && headCell.content && headCell.content(props);
  if (headCellContent) {
    return headCellContent;
  }

  const {
    column,
    dispatch,
    sortingMode,
  } = props;
  const isSortingEnabled = sortingMode === SortingMode.Single;
  const sortClick = isSortingEnabled ? () => {
    dispatch(updateSortDirection(column.key));
  } : undefined;
  return (
    <div
      className={`${defaultOptions.css.theadCellContent} ${isSortingEnabled ? 'ka-pointer' : ''}`}
      onClick={sortClick}
    >
      <span>{column.title}</span>
      {
        column.sortDirection && isSortingEnabled && (
          <span
            className={
              column.sortDirection === SortDirection.Ascend
                ? defaultOptions.css.iconSortArrowUp
                : defaultOptions.css.iconSortArrowDown
            }
          />
        )
      }
    </div>
  );
};

export default HeadCellContent;
