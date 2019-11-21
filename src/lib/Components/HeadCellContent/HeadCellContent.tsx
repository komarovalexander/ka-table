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
    onEvent,
    sortingMode,
  } = props;
  const isSortingEnabled = sortingMode === SortingMode.Single;
  const sortClick = isSortingEnabled ? () => {
    const updatedColumn = getColumnWithUpdatedSortDirection(column);
    onEvent(Events.SortingChanged, { column: updatedColumn });
  } : undefined;
  return (
    <div
      className={`tc-thead-cell-content ${isSortingEnabled ? 'tc-pointer' : ''}`}
      onClick={sortClick}
    >
      <div>{title}</div>
      {
        sortDirection && isSortingEnabled && (
          <div
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
