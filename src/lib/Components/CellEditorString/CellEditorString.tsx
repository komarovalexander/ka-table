import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
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
      onChange={(event) => dispatch(ActionType.ChangeRowData, {newValue: {...rowData, [field]: event.currentTarget.value}})}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(ActionType.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorString;
