import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode, Events } from '../../enums';
import { Column } from '../../Models/Column';
import { EventFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellComponentProps {
  column: Column;
  editingMode: EditingMode;
  isEditableCell: boolean;
  isSelectedRow: boolean;
  dispatch: EventFunc;
  rowData: any;
  rowKeyField: string;
}

const CellComponent: React.FunctionComponent<ICellComponentProps> = (props) => {
  const {
    column,
    column: { style },
    dispatch,
    isEditableCell,
  } = props;
  return (
    <td style={style} className={defaultOptions.css.cell}>
      { isEditableCell ? (
          <CellEditor
            {...props}
            field={getField(column)}
            onValueChange={dispatch.bind(null, Events.RowDataChanged)}
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
