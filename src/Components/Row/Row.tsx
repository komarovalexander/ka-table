import React from 'react';

import { Column } from '../../Models/Column';
import Cell from '../Cell/Cell';

export interface IRowProps {
  columns: Column[];
  data: any;
}

const Row: React.FunctionComponent<IRowProps> = ({ columns, data }) => {
  return (
    <tr>
      {columns.map((column) => (<Cell key={column.field} text={data[column.field]}/>))}
    </tr>
  );
};

export default Row;
