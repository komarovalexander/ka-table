import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import HeadCellContent from '../HeadCellContent/HeadCellContent';

export interface IHeadCellProps {
  column: Column;
  sortingMode: SortingMode;
  dispatch: DispatchFunc;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column: { style },
  } = props;
  return (
    <th scope='col' style={style} className={defaultOptions.css.theadCell}>
      <HeadCellContent {...props}/>
    </th>
  );
};

export default HeadCell;
