import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ISummaryRowProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import EmptyCells from '../EmptyCells/EmptyCells';
import { SummaryCell } from '../SummaryCell/SummaryCell';

export const SummaryRow: React.FunctionComponent<ISummaryRowProps> = (props) => {
  const {
    childComponents,
    columns,
    groupColumnsCount
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.summaryRow,
  }, props, childComponents?.summaryRow);
  return (
    <tr {...elementAttributes}>
      {content || (
        <>
          <EmptyCells count={groupColumnsCount}/>
          {columns.map((column) => <SummaryCell key={column.key} {...props} column={column}/>)}
        </>
      )}
    </tr>
  );
};
