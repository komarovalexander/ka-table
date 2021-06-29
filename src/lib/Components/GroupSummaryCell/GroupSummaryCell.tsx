import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IGroupSummaryCellProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

export const GroupSummaryCell: React.FunctionComponent<IGroupSummaryCellProps> = (props) => {
  const {
    column: { style },
    childComponents
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.groupSummaryCell,
    style
  }, props, childComponents?.groupSummaryCell);
  return (
    <td {...elementAttributes}>
      {content}
    </td>
  );
};
