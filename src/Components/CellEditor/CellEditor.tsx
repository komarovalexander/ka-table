import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';

interface ICellEditorProps {
  field: string;
  onOptionChanged?: OptionChangedFunc;
  rowData: any;
  rowKeyValue?: any;
  editableCells?: Cell[];
  changeToText: () => void;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = ({
  field,
  rowData,
  changeToText,
}) => {
  const value = rowData[field];
  return (
    <input autoFocus={true} type='text'
      value={value}
      onBlur={changeToText}/>
  );
};

export default CellEditor;
