import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, Events } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { EventFunc, RowDataChangedFunc } from '../../types';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellComponentProps {
  column: Column;
  editingMode: EditingMode;
  isEditableCell: boolean;
  onEvent: EventFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKey: any;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = ({
  column,
  column: { textAlign },
  isEditableCell,
  editingMode,
  onEvent,
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
              () => {
                const cell: Cell = { field: column.field, rowKeyValue };
                onEvent(Events.CloseEditor, { cell });
              }
            }
            onValueChange={onRowDataChanged}
          />
        )
        : (
          <CellContent {...{ column, rowData }}
            openEditor={
              () => {
                if (editingMode !== EditingMode.None) {
                  const cell: Cell = { field: column.field, rowKeyValue };
                  onEvent(Events.OpenEditor, { cell });
                }
              }
            }
          />
        )
      }
    </td>
  );
};

export default CellComponent;
