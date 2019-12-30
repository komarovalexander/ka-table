import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { getField } from '../../Utils/ColumnUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorNumber: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  rowData,
  rowKeyField,
}) => {
  const field = getField(column);
  const value = rowData[field];
  return (
    <input autoFocus={true}
      className={defaultOptions.css.numberInput}
      type='number'
      value={value === null || value === undefined ? '' : value}
      onChange={(event) => {
        const newValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
        dispatch(Events.RowDataChanged, {newValue: {...rowData, [field]: newValue}});
      }}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorNumber;
