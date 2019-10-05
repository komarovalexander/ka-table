import * as React from 'react';

interface IHeadCellProps {
  text: string;
  sortClick: React.MouseEventHandler;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = ({ sortClick, text }) => {
  return <th><div onClick={sortClick}>{text}</div></th>;
};

export default HeadCell;
