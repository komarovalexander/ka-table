import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { Cell } from '../../models';
import { replaceValue } from '../../Utils/DataUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  field,
  rowData,
  value,
  rowKeyField,
}) => {
  return (
    <input autoFocus={true}
      className={defaultOptions.css.numberInput}
      type='number'
      value={value === null || value === undefined ? '' : value}
      onChange={(event) => {
        const newValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
        dispatch(ActionType.ChangeRowData, {newValue: replaceValue(rowData, column, newValue)});
      }}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch({ type: ActionType.CloseEditor, cell });
      }}
    />
  );
};

export default CellEditorNumber;
