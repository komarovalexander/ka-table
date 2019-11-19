import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { Column } from '../../Models/Column';
import HeadCellContent from '../HeadCellContent/HeadCellContent';

export interface IHeadCellProps {
  column: Column;
  sortClick?: () => void;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column: { width,  textAlign },
  } = props;
  return (
    <th scope='col' style={{ width, textAlign }} className={defaultOptions.css.theadCell}>
      <HeadCellContent {...props}/>
    </th>
  );
};

export default HeadCell;
