import * as React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';

const FilterCell: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column: { textAlign },
    onValueChange,
  } = props;
  return (
    <td style={{textAlign}}>
      <CellEditorDataType
        {...props}
        onValueChange={onValueChange}
      />
      <div className='tc-filter-row-clear-button' onClick={() => { onValueChange(null); }}>
        Clear
      </div>
    </td>
  );
};

export default FilterCell;
