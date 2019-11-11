import React from 'react';

import { SortingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../types';
import { sortUtilsClickHandler } from '../../Utils/HeadRowUtils';
import HeadCell from '../HeadCell/HeadCell';

export interface IHeadRowProps {
  columns: Column[];
  sortingMode: SortingMode;
  onOptionChanged: OptionChangedFunc;
}

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({ columns, onOptionChanged, sortingMode }) => {
  return (
    <tr className='tc-header-row'>
      {columns.map((column) => {
        const sortClick: any = sortingMode === SortingMode.Single && (() => {
          sortUtilsClickHandler(columns, column, onOptionChanged);
        });
        return (
          <HeadCell
            key={column.field}
            column={column}
            sortClick={sortClick}
          />
        );
      })}
    </tr>
  );
};

export default HeadRow;
