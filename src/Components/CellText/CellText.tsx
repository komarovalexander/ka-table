import * as React from 'react';

interface ICellTextProps {
  value: any;
}

const CellText: React.FunctionComponent<ICellTextProps> = ({ value }) => {
  return (
    <div>{value}</div>
  );
};

export default CellText;
