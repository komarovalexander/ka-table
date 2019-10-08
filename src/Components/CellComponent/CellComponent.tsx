import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { RowDataChangedFunc } from '../../Types/RowDataChangedFunc';
import {
  changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler,
} from '../../Utils/CellUtils';
import CellEditorState from '../CellEditorState/CellEditorState';
import CellText from '../CellText/CellText';

export interface ICellProps {
  editableCells: Cell[];
  column: Column;
  isEditableCell: boolean;
  onOptionChanged: OptionChangedFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKey: any;
}

const CellComponent: React.FunctionComponent<ICellProps> = ({
  editableCells,
  column,
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
            {...{ column, rowData }}
            onChangeToText={
              () => changeCellEditorToCellTextHandler(
                { field: column.field, rowKeyValue },
                editableCells,
                onOptionChanged)
            }
            onValueChange={onRowDataChanged}
          />
        )
        : (
          <CellText {...{ column, rowData }}
            onChangeToEditor={
              () => changeCellTextToCellEditorHandler(
                { field: column.field, rowKeyValue },
                editableCells,
                onOptionChanged)
            }
          />
        )
      }
    </td>
  );
};

export default CellComponent;
