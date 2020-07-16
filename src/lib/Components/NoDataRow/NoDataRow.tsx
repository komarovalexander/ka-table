import React from 'react';

import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { getElementCustomization } from '../../Utils/CoponentUtils';

export interface INoDataRow {
  childComponents: ChildComponents,
  columns: Column[];
  groupColumnsCount: number;
}
const NoDataRow: React.FunctionComponent<INoDataRow> = (props) => {
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
