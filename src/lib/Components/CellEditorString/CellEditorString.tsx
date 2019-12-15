import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { getRowValueByColumn } from '../../Utils/RowUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorString: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  onValueChange,
  rowData,
  rowKeyField,
}) => {
  const value = getRowValueByColumn(rowData, column);
  return (
    <input autoFocus={true}
      type='text'
      className={defaultOptions.css.textInput}
      value={value || ''}
      onChange={(event) => onValueChange(event.currentTarget.value)}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorString;
