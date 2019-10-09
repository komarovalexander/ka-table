import * as React from 'react';

interface IHeadCellProps {
  text: string;
  sortClick?: React.MouseEventHandler;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = ({ sortClick, text }) => {
  return (
    <th>
      <div>{text}</div>
      {sortClick && <div onClick={sortClick}>Sort</div>}
    </th>
  );
};

export default HeadCell;
