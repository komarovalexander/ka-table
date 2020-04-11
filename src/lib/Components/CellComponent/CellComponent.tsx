import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildAttributes } from '../../models';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
import { getValueByColumn } from '../../Utils/DataUtils';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export const unspecifiedEditorValue = {};
export interface ICellComponentProps {
  childAttributes: ChildAttributes;
  column: Column;
  dispatch: DispatchFunc;
  editingMode: EditingMode;
  isEditableCell: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  editorValue?: any;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = (props) => {
  const {
    column,
    rowData,
    column: { style },
    isEditableCell,
    editorValue,
  } = props;

  let value;

  if (isEditableCell && editorValue !== unspecifiedEditorValue) {
    value = editorValue;
  } else {
    value = getValueByColumn(rowData, column);
  }
  return (
    <td style={style} className={defaultOptions.css.cell}>
      { isEditableCell ? (
          <CellEditor
            {...props}
            value={value}
            field={getField(column)}
          />
        )
        : (
          <CellContent
            {...props}
            value={value}
            field={getField(column)}
          />
        )
      }
    </td>
  );
};

export default CellComponent;
