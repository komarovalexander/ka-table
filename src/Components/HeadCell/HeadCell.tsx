import * as React from 'react';

import { Column } from '../../Models/Column';

export interface IHeadCellProps {
  column: Column;
  sortClick?: React.MouseEventHandler;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = ({ sortClick, column: { width, title, textAlign } }) => {
  return (
    <th scope='col' style={{ width, textAlign }}>
      <div>{title}</div>
      {sortClick && <div onClick={sortClick}>Sort</div>}
    </th>
  );
};

export default HeadCell;
