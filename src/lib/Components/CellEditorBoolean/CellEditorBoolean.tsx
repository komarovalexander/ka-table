import React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { Cell } from '../../models';
import { isEmpty } from '../../Utils/CommonUtils';
import { replaceValue } from '../../Utils/DataUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorBoolean: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  rowData,
  rowKeyField,
  value,
}) => {
  return (
    <input autoFocus={true}
      className={defaultOptions.css.checkbox}
      type='checkbox'
      ref={(elem) => elem && (elem.indeterminate = isEmpty(value))}
      checked={value || false}
      onChange={(event) => dispatch(ActionType.ChangeRowData, {newValue: replaceValue(rowData, column, event.currentTarget.checked)})}
      onBlur={() => {
        const cell: Cell = { columnKey: column.key, rowKey: rowData[rowKeyField] };
        dispatch({ type: ActionType.CloseEditor, cell });
      }}
    />
  );
};

export default CellEditorBoolean;
