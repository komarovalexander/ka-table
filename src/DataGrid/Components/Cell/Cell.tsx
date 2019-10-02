import * as React from 'react';

interface ICellProps {
  text: string;
}

const Cell: React.FunctionComponent<ICellProps> = (props) => {
  return <td>{props.text}</td>;
};

export default Cell;
