import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events, SortDirection, SortingMode } from '../../enums';
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
    onEvent(Events.SortingChanged, { column });
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
                ? defaultOptions.css.iconSortArrowDown
                : defaultOptions.css.iconSortArrowUp
            }
          />
        )
      }
    </div>
  );
};

export default HeadCellContent;
