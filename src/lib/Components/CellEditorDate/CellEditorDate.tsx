import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { Cell } from '../../models';
import { getValueByColumn, replaceValue } from '../../Utils/DataUtils';
import { getDateInputValue } from '../../Utils/DateUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDate: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  rowData,
  rowKeyField,
}) => {
  const fieldValue = getValueByColumn(rowData, column);
  const value = fieldValue && getDateInputValue(fieldValue);
  return (
    <input
      autoFocus={true}
      className={defaultOptions.css.dateInput}
      type='date'
      value={value || ''}
      onChange={(event) => {
        const targetValue: string = event.currentTarget.value;
        const newValue = targetValue ? new Date(targetValue) : null;
        dispatch(ActionType.ChangeRowData, {newValue: replaceValue(rowData, column, newValue)});
      }}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch({ type: ActionType.CloseEditor, cell });
      }}
    />
  );
};

export default CellEditorDate;
