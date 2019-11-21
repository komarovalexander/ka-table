import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { isEmpty } from '../../Utils/CommonUtils';
import { getRowValueByColumn } from '../../Utils/RowUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorBoolean: React.FunctionComponent<ICellEditorProps> = ({
  column,
  onEvent,
  onValueChange,
  rowData,
  rowKeyField,
}) => {
  const value = getRowValueByColumn(rowData, column);
  return (
    <input autoFocus={true}
      className={defaultOptions.css.checkbox}
      type='checkbox'
      ref={(elem) => elem && (elem.indeterminate = isEmpty(value))}
      checked={value || false}
      onChange={(event) => onValueChange(event.currentTarget.checked)}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        onEvent(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorBoolean;
