import React from 'react';

import { closeEditor, updateCellValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { isEmpty } from '../../Utils/CommonUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorBoolean: React.FunctionComponent<ICellEditorProps> = ({
  column,
  dispatch,
  rowKeyValue,
  value,
}) => {
  return (
    <input autoFocus={true}
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
