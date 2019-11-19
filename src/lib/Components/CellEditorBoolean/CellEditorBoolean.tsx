import React from 'react';

import defaultOptions from '../../defaultOptions';
import { Events } from '../../enums';
import { Cell } from '../../models';
import { isEmpty } from '../../Utils/CommonUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorBoolean: React.FunctionComponent<ICellEditorProps> = ({
  column,
  onEvent,
  onValueChange,
  rowData,
  rowKey,
}) => {
  const value = rowData[column.field];
  return (
    <input autoFocus={true}
      className={defaultOptions.css.checkbox}
      type='checkbox'
      ref={(elem) => elem && (elem.indeterminate = isEmpty(value))}
      checked={value || false}
      onChange={(event) => onValueChange(event.currentTarget.checked)}
      onBlur={() => {
        const cell: Cell = { field: column.field, rowKeyValue: rowData[rowKey] };
        onEvent(Events.CloseEditor, { cell });
      }}
    />
  );
};

export default CellEditorBoolean;
