import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { EventFunc } from '../../types';
import HeadCellContent from '../HeadCellContent/HeadCellContent';

export interface IHeadCellProps {
  column: Column;
  sortingMode: SortingMode;
  onEvent: EventFunc;
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