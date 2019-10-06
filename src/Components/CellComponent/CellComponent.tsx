import * as React from 'react';

import { Cell } from '../../Models/Cell';

interface ICellProps {
  field: string;
  rowData: any;
  rowKeyValue: any;
  isEditableCell: boolean;
}

const CellComponent: React.FunctionComponent<ICellProps> = ({ field, rowKeyValue, rowData, isEditableCell }) => {
  const value = rowData[field];
  return (
    <td className='tc-cell'>
      { isEditableCell ?
        <input type='text' value={value} />
        : <div>{value}</div>
      }
    </td>
  );
};

export default CellComponent;
