import React from 'react';

import defaultOptions from '../../defaultOptions';
import { IHeadRowProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import EmptyCells from '../EmptyCells/EmptyCells';
import HeadCell from '../HeadCell/HeadCell';

const HeadRow: React.FunctionComponent<IHeadRowProps> = (props) => {
  const {
    areAllRowsSelected,
    childComponents,
    columnReordering,
    columnResizing,
    columns,
    dispatch,
    groupColumnsCount,
    sortingMode
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.theadRow
  }, props, childComponents.headRow);
  return (
    <tr {...elementAttributes}>
      {
        content ||
        (
          <>
            <EmptyCells count={groupColumnsCount} isTh={true} />
            {
              columns.map((column) => {
                return (
                  <HeadCell
                    areAllRowsSelected={areAllRowsSelected}
                    childComponents={childComponents}
                    columnReordering={columnReordering}
                    columnResizing={columnResizing}
                    column={column}
                    dispatch={dispatch}
                    key={column.key}
                    sortingMode={sortingMode}
                  />
                );
              })
            }
          </>
        )
      }
    </tr>
  );
};

export default HeadRow;
