import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { changeCellEditorToCellTextHandler } from '../../Utils/CellUtils';
import CellEditor from '../CellEditor/CellEditor';
import CellText from '../CellText/CellText';

interface ICellProps {
  field: string;
  onOptionChanged: OptionChangedFunc;
  rowData: any;
  rowKeyValue: any;
  isEditableCell: boolean;
  editableCells: Cell[];
}

const CellComponent: React.FunctionComponent<ICellProps> = ({
  field,
  rowKeyValue,
  rowData, 
  isEditableCell,
  editableCells,
  onOptionChanged,
}) => {
  const value = rowData[field];
  return (
    <td className='tc-cell'>
      { isEditableCell ?
          <input autoFocus type='text' 
            value={value} 
            onBlur={() => changeCellEditorToCellTextHandler({ field, rowKeyValue }, editableCells, onOptionChanged)}/>
        : (
          <CellText {...{ field, rowData, rowKeyValue, editableCells, onOptionChanged }}/>
        )
      }
    </td>
  );
};

export default CellComponent;
