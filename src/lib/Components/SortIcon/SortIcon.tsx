import * as React from 'react';

import { DownIcon } from '../../Icons/DownIcon';
import { ISortIconProps } from '../../props';
import { SortDirection } from '../../enums';
import { UpIcon } from '../../Icons/UpIcon';
import defaultOptions from '../../defaultOptions';
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
          <>
            {column.sortDirection === SortDirection.Ascend ? <UpIcon className={defaultOptions.css.iconSortArrowUp} /> : <DownIcon className={defaultOptions.css.iconSortArrowDown} />}
            <span>{column.sortIndex}</span>
          </> 
        )}
    </span>
  );
};

export default SortIcon;
