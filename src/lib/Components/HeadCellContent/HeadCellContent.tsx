import * as React from 'react';

import { updateSortDirection } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { SortDirection } from '../../enums';
import { IHeadCellProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isSortingEnabled } from '../../Utils/SortUtils';

const HeadCellContent: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column,
    dispatch,
    sortingMode,
    childComponents: { headCellContent }
  } = props;
  const sortingEnabled = isSortingEnabled(sortingMode);
  const onClick = sortingEnabled ? () => {
    dispatch(updateSortDirection(column.key));
  } : undefined;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.theadCellContent} ${sortingEnabled ? 'ka-pointer' : ''}`,
    onClick
  }, props, headCellContent);

  return (
    <div {...elementAttributes}>
      {content || <span>{column.title}</span>}
      {column.sortDirection && sortingEnabled && (
        <span
          className={
            column.sortDirection === SortDirection.Ascend
              ? defaultOptions.css.iconSortArrowUp
              : defaultOptions.css.iconSortArrowDown
          }
        >{column.sortIndex}</span>
      )}
    </div>
  );
};

export default HeadCellContent;
