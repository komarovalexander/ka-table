import * as React from 'react';

import { updateSortDirection } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { SortDirection, SortingMode } from '../../enums';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { IHeadCellProps } from '../HeadCell/HeadCell';

const HeadCellContent: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    childComponents,
    column,
    dispatch,
    sortingMode,
  } = props;

  const isSortingEnabled = sortingMode === SortingMode.Single;
  const sortClick = isSortingEnabled ? () => {
    dispatch(updateSortDirection(column.key));
  } : undefined;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.theadCellContent} ${isSortingEnabled ? 'ka-pointer' : ''}`,
    onClick: sortClick
  }, props, childComponents.headCell);

  return (
    <div {...elementAttributes}>
      {(content || (
        <>
          <span>{column.title}</span>
          {column.sortDirection && isSortingEnabled && (
            <span
              className={
                column.sortDirection === SortDirection.Ascend
                  ? defaultOptions.css.iconSortArrowUp
                  : defaultOptions.css.iconSortArrowDown
              }
            />
          )}
        </>
      ))}
    </div>
  );
};

export default HeadCellContent;
