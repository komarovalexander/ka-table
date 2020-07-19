import React from 'react';

import { INoDataRowProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const NoDataRow: React.FunctionComponent<INoDataRowProps> = (props) => {
  const {
    childComponents,
    columns,
    groupColumnsCount,
  } = props;
  const { elementAttributes, content } = getElementCustomization({
    className: 'ka-tr ka-no-data-row'
  }, props, childComponents.noDataRow);
  return (
    <tr {...elementAttributes}>
      <td className='ka-no-data-cell' colSpan={columns.length + groupColumnsCount}>
        {content}
      </td>
    </tr>
  );
};

export default NoDataRow;
