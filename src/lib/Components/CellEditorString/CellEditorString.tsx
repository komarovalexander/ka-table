import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { Cell } from '../../models';
import { replaceValue } from '../../Utils/DataUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  rowData,
  value,
  rowKeyField,
}) => {
  return (
    <input autoFocus={true}
      type='text'
      className={defaultOptions.css.textInput}
      value={value || ''}
      onChange={(event) => {
        dispatch(ActionType.ChangeRowData, {newValue: replaceValue(rowData, column, event.currentTarget.value)});
      }}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch({ type: ActionType.CloseEditor, cell });
      }}
    />
  );
};

export default CellEditorString;
