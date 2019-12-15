import * as React from 'react';

import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';

const FilterCell: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column: { style, filterCell },
    onValueChange,
  } = props;
  return (
    <td style={style} className='ka-thead-cell ka-filter-row-cell'>
      {
        filterCell ? filterCell(props) :
        (
          <CellEditorDataType
            {...props}
            onValueChange={onValueChange}
          />
        )
      }
    </td>
  );
};

export default FilterCell;
