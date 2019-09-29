import React from 'react';

import Cell from '../Cell/Cell';
import { Column } from '../Models/Column';

interface IProps {
  columns: Column[];
  data: any;
}

const Row: React.FunctionComponent<IProps> = ({ columns, data }) => {
  return (
    <tr>
      {columns.map((column) => (<Cell key={column.key} text={data[column.key]}/>))}
    </tr>
  );
};

export default Row;
