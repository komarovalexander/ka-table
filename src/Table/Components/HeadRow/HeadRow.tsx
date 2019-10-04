import React from 'react';

import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { sortUtilsClickHandler } from '../../Utils/HeadRowUtils';
import HeadCell from '../HeadCell/HeadCell';

interface IHeadRowProps {
  columns: Column[];
  onOptionChanged: OptionChangedFunc;
}

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({ columns, onOptionChanged }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <HeadCell
          key={column.key}
          text={column.name}
          sortClick={
            // tslint:disable-next-line:jsx-no-lambda
            () => {
              sortUtilsClickHandler(columns, column, index, onOptionChanged);
            }
          }
        />
      ))}
    </tr>
  );
};

export default HeadRow;
