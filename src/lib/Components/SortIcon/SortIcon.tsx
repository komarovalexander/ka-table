import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortDirection } from '../../enums';
import { ISortIconProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const SortIcon: React.FunctionComponent<ISortIconProps> = (props) => {
  const {
    column,
    childComponents
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.iconSort,
  }, props, childComponents?.sortIcon);

  return (
    <span {...elementAttributes}>
      {content || (
        <span
          className={
            column.sortDirection === SortDirection.Ascend
              ? defaultOptions.css.iconSortArrowUp
              : defaultOptions.css.iconSortArrowDown
            }
          >
            {column.sortIndex}
        </span>
      )}
    </span>
  );
};

export default SortIcon;
