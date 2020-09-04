import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ITableBodyProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import TableBodyContent from '../TableBodyContent/TableBodyContent';

const TableBody: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    childComponents,
    dispatch,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.tbody,
  }, { ...props, dispatch }, childComponents.tableBody);
  return (
    <tbody {...elementAttributes} className={defaultOptions.css.tbody}>
      {content || <TableBodyContent {...props} />}
    </tbody>
  );
};

export default TableBody;
