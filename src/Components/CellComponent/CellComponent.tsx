import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { RowDataChangedFunc } from '../../Types/RowDataChangedFunc';
import {
  changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler,
} from '../../Utils/CellUtils';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellComponentProps {
  editableCells: Cell[];
  column: Column;
  isEditableCell: boolean;
  onOptionChanged: OptionChangedFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKey: any;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = ({
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
          <CellEditor
            {...{ column, rowData }}
            close={
              () => changeCellEditorToCellTextHandler(
                { field: column.field, rowKeyValue },
                editableCells,
                onOptionChanged)
            }
            onValueChange={onRowDataChanged}
          />
        )
        : (
          <CellContent {...{ column, rowData }}
            openEditor={
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
