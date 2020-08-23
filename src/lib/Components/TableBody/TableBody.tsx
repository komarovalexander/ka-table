import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ITableBodyProps } from '../../props';
import TableBodyContent from '../TableBodyContent/TableBodyContent';

const TableBody: React.FunctionComponent<ITableBodyProps> = (props) => {
  return (
    <tbody className={defaultOptions.css.tbody}>
      <TableBodyContent
        {...props}
      />
    </tbody>
  );
};

export default TableBody;
