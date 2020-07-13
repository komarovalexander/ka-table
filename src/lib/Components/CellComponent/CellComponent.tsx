import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildComponents } from '../../models';
import { Column } from '../../Models/Column';
import { DispatchFunc, FormatFunc, ValidationFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
import { getValueByColumn } from '../../Utils/DataUtils';
import { extendProps } from '../../Utils/PropsUtils';
import CellContent from '../CellContent/CellContent';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellProps {
  childComponents: ChildComponents;
  column: Column;
  dispatch: DispatchFunc;
  editingMode: EditingMode;
  editorValue?: any;
  format?: FormatFunc;
  hasEditorValue?: any;
  isDetailsRowShown: boolean;
  isEditableCell: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  validation?: ValidationFunc;
  validationMessage?: string;
}

const CellComponent: React.FunctionComponent<ICellProps> = (props) => {
  const {
    childComponents,
    column,
    column: { style },
    editorValue,
    hasEditorValue,
    isEditableCell,
    rowData,
  } = props;

  const value = hasEditorValue ? editorValue : getValueByColumn(rowData, column);

  const componentProps: React.HTMLAttributes<HTMLDivElement> = {
    className: defaultOptions.css.cell,
    style
  };

  const divProps = extendProps(componentProps, props, childComponents.cell);

  return (
    <td {...divProps}>
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
