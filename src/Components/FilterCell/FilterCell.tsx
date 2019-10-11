import * as React from 'react';

import { Column } from '../../Models/Column';
import emptyFunc from '../../Models/EmptyFunc';
import { ValueChangeFunc } from '../../Types/ValueChangeFunction';
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
    </td>
  );
};

export default FilterCell;
