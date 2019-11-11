import * as React from 'react';

import emptyFunc from '../../emptyFunc';
import { Column } from '../../Models/Column';
import { ValueChangeFunc } from '../../types';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';

export interface IFilterCellProps  {
  column: Column;
  rowData: any;
  close: () => void;
  onValueChange: ValueChangeFunc;
}

const FilterCell: React.FunctionComponent<IFilterCellProps> = ({
  column,
  column: { textAlign },
  rowData,
  onValueChange,
}) => {
  return (
    <td style={{textAlign}}>
      <CellEditorDataType
        {...{ column, rowData }}
        close={emptyFunc}
        onValueChange={onValueChange}
      />
      <div className='tc-filter-row-clear-button' onClick={() => { onValueChange(null); }}>
        Clear
      </div>
    </td>
  );
};

export default FilterCell;
