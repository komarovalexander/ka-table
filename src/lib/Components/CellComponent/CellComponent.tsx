import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { OptionChangedFunc, RowDataChangedFunc } from '../../types';
import {
  changeCellEditorToCellTextHandler, changeCellTextToCellEditorHandler,
} from '../../Utils/CellUtils';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellComponentProps {
  editableCells: Cell[];
  column: Column;
  editingMode: EditingMode;
  isEditableCell: boolean;
  onOptionChanged: OptionChangedFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKey: any;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = ({
  editableCells,
  column,
  column: { textAlign },
  isEditableCell,
  onOptionChanged,
  editingMode,
  onRowDataChanged,
  rowData,
  rowKey,
}) => {
  const rowKeyValue = rowData[rowKey];
  return (
    <td style={{textAlign}} className={defaultOptions.css.cell}>
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
              () => editingMode !== EditingMode.None && changeCellTextToCellEditorHandler(
                {field: column.field, rowKeyValue },
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
