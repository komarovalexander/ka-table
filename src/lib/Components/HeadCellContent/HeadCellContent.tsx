import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortDirection } from '../../enums';
import { IHeadCellProps } from '../HeadCell/HeadCell';

const HeadCellContent: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column: { headCell },
  } = props;
  if (headCell) {
    return headCell(props);
  }

  const {
    sortClick, column: { title, sortDirection },
  } = props;
  return (
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
  );
};

export default HeadCellContent;
