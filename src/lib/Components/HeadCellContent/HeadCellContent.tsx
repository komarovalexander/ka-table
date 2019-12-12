import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events, SortDirection, SortingMode } from '../../enums';
import { getColumnWithUpdatedSortDirection } from '../../Utils/HeadRowUtils';
import { IHeadCellProps } from '../HeadCell/HeadCell';

const HeadCellContent: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column: { headCell },
  } = props;
  if (headCell) {
    return headCell(props);
  }

  const {
    column,
    column: { title, sortDirection },
    dispatch,
    sortingMode,
  } = props;
  const isSortingEnabled = sortingMode === SortingMode.Single;
  const sortClick = isSortingEnabled ? () => {
    const updatedColumn = getColumnWithUpdatedSortDirection(column);
    dispatch(Events.SortingChanged, { column: updatedColumn });
  } : undefined;
  return (
    <div
      className={`ka-thead-cell-content ${isSortingEnabled ? 'ka-pointer' : ''}`}
      onClick={sortClick}
    >
      <span>{title}</span>
      {
        sortDirection && isSortingEnabled && (
          <span
            className={
              sortDirection === SortDirection.Ascend
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
