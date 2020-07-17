import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import { DispatchFunc, Field, ValidationFunc } from '../../types';
import { getCellEditorDispatchHandler } from '../../Utils/CellUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import CellEditorState from '../CellEditorState/CellEditorState';

export interface IFilterRowEditorProps {
  childComponents: ChildComponents;
  column: Column;
  dispatch: DispatchFunc;
}

export interface ICellEditorProps extends IFilterRowEditorProps {
  autoFocus?: boolean;
  editingMode: EditingMode;
  editorValue?: any;
  field: Field;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  value: any;
  validationMessage?: string;
  validation?: ValidationFunc;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    childComponents,
    dispatch,
    editingMode,
    validationMessage
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.cellEditor} ${validationMessage ? defaultOptions.css.kaCellEditorValidationError : ''}`
  }, props, childComponents.editor);

  return (
    <div {...elementAttributes}>
      {content || (
        editingMode === EditingMode.Cell
        ? <CellEditorState {...props} dispatch={getCellEditorDispatchHandler(dispatch)} autoFocus={true}/>
        : <CellEditorState {...props} />
      )}
    </div>
  );
};

export default CellEditor;
