import React from 'react';

import { closeEditor, updateCellValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { ICellEditorProps } from '../../props';
import { isEmpty } from '../../Utils/CommonUtils';

const CellEditorBoolean: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  rowKeyValue,
  value,
  autoFocus
}) => {
  return (
    <input
      autoFocus={autoFocus}
      className={defaultOptions.css.checkbox}
      type='checkbox'
      ref={(elem) => elem && (elem.indeterminate = isEmpty(value))}
      checked={value || false}
      onChange={(event) =>
        dispatch(updateCellValue(rowKeyValue, column.key, event.currentTarget.checked))
      }
      onBlur={() => {
        dispatch(closeEditor(rowKeyValue, column.key));
      }}
    />
  );
};

export default CellEditorBoolean;
