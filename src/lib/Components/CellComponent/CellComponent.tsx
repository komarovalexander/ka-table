import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { EventFunc, RowDataChangedFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellComponentProps {
  column: Column;
  editingMode: EditingMode;
  isEditableCell: boolean;
  isSelectedRow: boolean;
  dispatch: EventFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKeyField: string;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = (props) => {
  const {
    column,
    column: { style },
    isEditableCell,
    onRowDataChanged,
  } = props;
  return (
    <td style={style} className={defaultOptions.css.cell}>
      { isEditableCell ? (
          <CellEditor
            {...props}
            field={getField(column)}
            onValueChange={onRowDataChanged}
          />
        )
        : (
          <CellContent
            {...props}
            field={getField(column)}
          />
        )
      }
    </td>
  );
};

export default CellComponent;
