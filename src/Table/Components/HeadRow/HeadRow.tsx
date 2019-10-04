import React from 'react';

import { SortDirection } from '../../Enums/SortDirection';
import { Column } from '../../Models/Column';
import { DefaultOptions } from '../../Models/DefaultOptions';
import { OptionChangedParam } from '../../Models/EventParams/OptionChangedParam';
import HeadCell from '../HeadCell/HeadCell';

interface IHeadRowProps {
  columns: Column[];
  onOptionChanged: (newOption: OptionChangedParam) => void;
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
              const newColumns = [...columns];
              let sortDirection;
              if (column.sortDirection) {
                sortDirection = column.sortDirection === SortDirection.Ascend
                  ? SortDirection.Descend : SortDirection.Ascend;
              } else {
                sortDirection = DefaultOptions.columnSortDirection;
              }

              newColumns.forEach((newColumn, newColumnIndex) => {
                if (newColumn.sortDirection) {
                  newColumns[newColumnIndex] = {...newColumn};
                  newColumns[newColumnIndex].sortDirection = undefined;
                }
              });

              newColumns[index] = {...column};
              newColumns[index].sortDirection = sortDirection;
              onOptionChanged({
                name: 'columns',
                value: { columns: newColumns },
              });
            }
          }
        />
      ))}
    </tr>
  );
};

export default HeadRow;
