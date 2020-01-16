import React from 'react';

import { Column } from '../../Models/Column';
import { NoDataRowFunc } from '../../types';

export interface INoDataRow {
  columns: Column[];
  groupColumnsCount: number;
  noDataRow: NoDataRowFunc;
}
const NoDataRow: React.FunctionComponent<INoDataRow> = ({
  columns,
  groupColumnsCount,
  noDataRow,
}) => {
    return (
      <tr className='ka-tr ka-no-data-row'>
        <td className='ka-no-data-cell' colSpan={columns.length + groupColumnsCount}>
          {noDataRow()}
        </td>
      </tr>
    );
};

export default NoDataRow;
