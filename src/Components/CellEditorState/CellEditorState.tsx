import React, { useState } from 'react';

import { RowDataChangedFunc } from '../../Types/RowDataChangedFunc';
import CellEditor from '../CellEditor/CellEditor';

export interface ICellEditorStateProps {
  field: string;
  onChangeToText: () => void;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
}

const CellEditorState: React.FunctionComponent<ICellEditorStateProps> = ({
  field,
  rowData,
  onChangeToText,
  onRowDataChanged,
}) => {
  const [value, changeValue] = useState(rowData);
  const onValueStateChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const rowValue = { ...rowData, ...{ [field]: event.currentTarget.value} };
    changeValue(rowValue);
    onRowDataChanged(rowValue);
  };
  return (
    <CellEditor
      {...{ field, rowData: value }}
      onValueChange={onValueStateChange}
      onChangeToText={onChangeToText}/>
  );
};

export default CellEditorState;
