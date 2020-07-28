import React from 'react';

import { kaDefaultOptions } from '../../';
import { closeEditor, updateCellValue } from '../../actionCreators';
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
      className={kaDefaultOptions.css.checkbox}
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
