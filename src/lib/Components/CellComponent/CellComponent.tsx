import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildComponents } from '../../models';
import { Column } from '../../Models/Column';
import { DispatchFunc, FormatFunc, ValidationFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
import { getElementCustomization, MemoizeComponent } from '../../Utils/ComponentUtils';
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
  value: any;
}

const CellComponent: React.FunctionComponent<ICellProps> = (props) => {
  const {
    childComponents,
    column,
    column: { style },
    isEditableCell,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: defaultOptions.css.cell,
    style
  }, props, childComponents.cell);

  return (
    <td {...elementAttributes}>
      { content ||
      (
        isEditableCell ?
        (
          <CellEditor
            {...props}
            field={getField(column)}
          />
        )
        :
        (
          <CellContent
            {...props}
            field={getField(column)}
          />
        )
      )
      }
    </td>
  );
};

export default MemoizeComponent(CellComponent, (props: ICellProps) => props.childComponents.cell);
