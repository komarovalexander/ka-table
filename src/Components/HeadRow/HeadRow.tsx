import React from 'react';

import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { sortUtilsClickHandler } from '../../Utils/HeadRowUtils';
import HeadCell from '../HeadCell/HeadCell';

export interface IHeadRowProps {
  columns: Column[];
  onOptionChanged: OptionChangedFunc;
}

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({ columns, onOptionChanged }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <HeadCell
          key={column.field}
          text={column.title}
          sortClick={
            () => {
              sortUtilsClickHandler(columns, column, onOptionChanged);
            }
          }
        />
      ))}
    </tr>
  );
};

export default HeadRow;
