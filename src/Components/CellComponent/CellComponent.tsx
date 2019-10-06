import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { changeCellTextToCellEditorHandler } from '../../Utils/CellUtils';
import CellEditor from '../CellEditor/CellEditor';

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
        <CellEditor value={value} />
        : (
          <div 
            onDoubleClick={() => changeCellTextToCellEditorHandler({ field, rowKeyValue }, editableCells, onOptionChanged)}
          >{value}</div>
        )
      }
    </td>
  );
};

export default CellComponent;
