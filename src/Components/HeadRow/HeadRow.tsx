import React from 'react';

import { SortingMode } from '../../Enums/SortingMode';
import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { sortUtilsClickHandler } from '../../Utils/HeadRowUtils';
import HeadCell from '../HeadCell/HeadCell';

export interface IHeadRowProps {
  columns: Column[];
  sortingMode: SortingMode;
  onOptionChanged: OptionChangedFunc;
}

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({ columns, onOptionChanged, sortingMode }) => {
  return (
    <tr>
      {columns.map((column) => {
        const sortClick: any = sortingMode === SortingMode.Single && (() => {
          sortUtilsClickHandler(columns, column, onOptionChanged);
        });
        return (
          <HeadCell
            key={column.field}
            text={column.title}
            sortClick={sortClick}
          />
        );
      })}
    </tr>
  );
};

export default HeadRow;
