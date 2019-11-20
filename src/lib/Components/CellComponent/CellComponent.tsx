import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { EventFunc, RowDataChangedFunc } from '../../types';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellComponentProps {
  column: Column;
  editingMode: EditingMode;
  isEditableCell: boolean;
  isSelectedRow: boolean;
  onEvent: EventFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKey: any;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = (props) => {
  const {
    column: { textAlign },
    isEditableCell,
    onRowDataChanged,
  } = props;
  return (
    <td style={{textAlign}} className={defaultOptions.css.cell}>
      { isEditableCell ? (
          <CellEditor
            {...props}
            onValueChange={onRowDataChanged}
          />
        )
        : (
          <CellContent {...props} />
        )
      }
    </td>
  );
};

export default CellComponent;
