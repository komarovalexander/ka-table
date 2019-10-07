import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import {
  changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler,
} from '../../Utils/CellUtils';
import CellEditorState from '../CellEditorState/CellEditorState';
import CellText from '../CellText/CellText';

export interface ICellProps {
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
  return (
    <td className='tc-cell'>
      { isEditableCell ? (
          <CellEditorState
            {...{ field, rowData }}
            onChangeToText={
              () => changeCellEditorToCellTextHandler({ field, rowKeyValue }, editableCells, onOptionChanged)
            }
          />
        )
        : (
          <CellText {...{ field, rowData }}
            onChangeToEditor={
              () => changeCellTextToCellEditorHandler({ field, rowKeyValue }, editableCells, onOptionChanged)
            }
          />
        )
      }
    </td>
  );
};

export default CellComponent;
