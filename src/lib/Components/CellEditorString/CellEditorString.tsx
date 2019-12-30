import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Action } from '../../enums';
import { Cell } from '../../models';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  field,
  rowData,
  rowKeyField,
}) => {
  return (
    <input autoFocus={true}
      type='text'
      className={defaultOptions.css.textInput}
      value={rowData[field] || ''}
      onChange={(event) => dispatch(Action.ChangeRowData, {newValue: {...rowData, [field]: event.currentTarget.value}})}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(Action.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorString;
