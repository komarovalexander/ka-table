import React, { useCallback, useEffect, useState } from 'react';

import { getValueFromInputEvent } from '../../Utils/CellUtils';
import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import CellEditor, { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorState: React.FunctionComponent<ICellEditorProps> = ({
  column,
  rowData,
  onChangeToText,
  onValueChange,
}) => {
  const field = column.field;
  const [value, changeValue] = useState(rowData);
  const onValueStateChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const newValue = getValueFromInputEvent(event);
    const rowValue = { ...rowData, ...{ [field]: newValue } };
    changeValue(rowValue);
  };

  const onChangeToTextHandler = useCallback(() => {
    onValueChange({ ...rowData, ...{ [field]: value[field] } });
    onChangeToText();
  }, [field, onChangeToText, onValueChange, rowData, value]);

  useEffect(() => {
    return addEscEnterKeyEffect(onChangeToText, onChangeToTextHandler);
  }, [onChangeToText, onChangeToTextHandler]);
  return (
    <CellEditor
      column={column}
      rowData={value}
      onValueChange={onValueStateChange}
      onChangeToText={onChangeToTextHandler}/>
  );
};

export default CellEditorState;
