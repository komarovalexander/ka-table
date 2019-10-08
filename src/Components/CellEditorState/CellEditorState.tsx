import React, { useCallback, useEffect, useState } from 'react';

import { Column } from '../../Models/Column';
import { RowDataChangedFunc } from '../../Types/RowDataChangedFunc';
import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellEditorStateProps {
  column: Column;
  onChangeToText: () => void;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
}

const CellEditorState: React.FunctionComponent<ICellEditorStateProps> = ({
  column,
  rowData,
  onChangeToText,
  onRowDataChanged,
}) => {
  const field = column.field;
  const [value, changeValue] = useState(rowData);
  const onValueStateChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const rowValue = { ...rowData, ...{ [field]: event.currentTarget.value} };
    changeValue(rowValue);
  };

  const onChangeToTextHandler = useCallback(() => {
    onRowDataChanged({ ...rowData, ...{ [field]: value[field] } });
    onChangeToText();
  }, [field, onChangeToText, onRowDataChanged, rowData, value]);

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
