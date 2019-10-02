import React from 'react';

import { Column } from '../../Models/Column';
import Cell from '../Cell/Cell';

interface IHeadRowProps {
  columns: Column[];
  data: any;
}

const Row: React.FunctionComponent<IHeadRowProps> = ({ columns, data }) => {
  return (
    <tr>
      {columns.map((column) => (<Cell key={column.key} text={data[column.key]}/>))}
    </tr>
  );
};

export default Row;
