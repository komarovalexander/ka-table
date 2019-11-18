import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortDirection } from '../../enums';
import { Column } from '../../Models/Column';

export interface IHeadCellProps {
  column: Column;
  sortClick?: () => void;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = ({
  sortClick, column: { width, title, textAlign, sortDirection },
}) => {
  return (
    <th scope='col' style={{ width, textAlign }} className={defaultOptions.css.theadCell}>
      <div className='tc-thead-cell-content' onClick={sortClick ? sortClick : undefined}>
        <div>{title}</div>
        {
          sortDirection && sortClick && (
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
    </th>
  );
};

export default HeadCell;
