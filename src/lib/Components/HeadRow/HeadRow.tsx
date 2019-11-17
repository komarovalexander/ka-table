import React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../types';
import { sortUtilsClickHandler } from '../../Utils/HeadRowUtils';
import HeadCell from '../HeadCell/HeadCell';

export interface IHeadRowProps {
  columns: Column[];
  sortingMode: SortingMode;
  onOptionChanged: OptionChangedFunc;
  groupColumnsCount: number;
}

const getEmptyColumns = (count: number) => {
  const columns = [];
  for (let i = 0; i < count; i++) {
    columns.push(<th colSpan={0} className='tc-empty-column'/>);
  }
  return columns;
};

const HeadRow: React.FunctionComponent<IHeadRowProps> = ({
  columns, onOptionChanged, sortingMode, groupColumnsCount,

}) => {
  return (
    <tr className={defaultOptions.css.theadRow}>
      {getEmptyColumns(groupColumnsCount)}
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
