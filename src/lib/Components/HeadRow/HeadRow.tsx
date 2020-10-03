import React from 'react';

import defaultOptions from '../../defaultOptions';
import { IHeadRowProps } from '../../props';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

const HeadRow: React.FunctionComponent<IHeadRowProps> = (props) => {
  const {
    groupColumnsCount,
    columns
  } = props;
  return (
    <tr className={defaultOptions.css.theadRow}>
      <EmptyCells count={groupColumnsCount} isTh={true}/>
      {columns.map((column) => {
        return (
          <HeadCell
            {...props}
            column={column}
            key={column.key}
          />
        );
      })}
    </tr>
  );
};

export default HeadRow;
