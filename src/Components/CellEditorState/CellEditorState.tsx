import React, { useState } from 'react';

import { ValueChangeFunc } from '../../Types/ValueChangeFunction';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellEditorStateProps {
  field: string;
  rowData: any;
  onChangeToText: () => void;
  onValueChange?: ValueChangeFunc;
}

const CellEditorState: React.FunctionComponent<ICellEditorStateProps> = ({
  field,
  rowData,
  onChangeToText,
}) => {
  const [value, changeValue] = useState(rowData);
  const onValueStateChange = (event: React.FormEvent<HTMLInputElement>): void => {
    changeValue({ ...rowData, ...{ [field]: event.currentTarget.value} });
  };
  return (
    <CellEditor
      {...{ field, rowData: value }}
      onValueChange={onValueStateChange}
      onChangeToText={onChangeToText}/>
  );
};

export default CellEditorState;
