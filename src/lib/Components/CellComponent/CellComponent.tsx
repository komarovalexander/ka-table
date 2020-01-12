import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildAttributes } from '../../models';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellComponentProps {
  childAttributes: ChildAttributes;
  column: Column;
  dispatch: DispatchFunc;
  editingMode: EditingMode;
  isEditableCell: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = (props) => {
  const {
    column,
    column: { style },
    isEditableCell,
  } = props;
  return (
    <td style={style} className={defaultOptions.css.cell}>
      { isEditableCell ? (
          <CellEditor
            {...props}
            field={getField(column)}
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
