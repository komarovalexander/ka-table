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

export interface ICellComponentProps {
  childAttributes: ChildAttributes;
  column: Column;
  dispatch: DispatchFunc;
  editingMode: EditingMode;
  editorValue?: any;
  hasEditorValue?: any;
  isEditableCell: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  validationMessage?: string;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = (props) => {
  const {
    column,
    column: { style },
    editorValue,
    hasEditorValue,
    isEditableCell,
    rowData,
  } = props;

  const value = hasEditorValue ? editorValue : getValueByColumn(rowData, column);
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
