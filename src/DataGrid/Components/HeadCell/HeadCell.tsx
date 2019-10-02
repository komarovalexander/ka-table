import * as React from 'react';

interface IHeadCellProps {
  text: string;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = (props) => {
  return <th>{props.text}</th>;
};

export default HeadCell;
