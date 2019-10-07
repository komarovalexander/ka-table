import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { RowDataChangedFunc } from '../../Types/RowDataChangedFunc';
import {
  changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler,
} from '../../Utils/CellUtils';
import CellEditorState from '../CellEditorState/CellEditorState';
import CellText from '../CellText/CellText';

export interface ICellProps {
  editableCells: Cell[];
  field: string;
  isEditableCell: boolean;
  onOptionChanged: OptionChangedFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKey: any;
}

const CellComponent: React.FunctionComponent<ICellProps> = ({
  editableCells,
  field,
  isEditableCell,
  onOptionChanged,
  onRowDataChanged,
  rowData,
  rowKey,
}) => {
  const rowKeyValue = rowData[rowKey];
  return (
    <td className='tc-cell'>
      { isEditableCell ? (
          <CellEditorState
            {...{ field, rowData }}
            onChangeToText={
              () => changeCellEditorToCellTextHandler({ field, rowKeyValue }, editableCells, onOptionChanged)
            }
            onRowDataChanged={onRowDataChanged}
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
