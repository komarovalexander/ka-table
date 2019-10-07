import * as React from 'react';

import { Cell } from '../../Models/Cell';
import { OptionChangedFunc } from '../../Types/OptionChangedFunc';
import { changeCellTextToCellEditorHandler } from '../../Utils/CellUtils';

interface ICellTextProps {
  field: string;
  onOptionChanged: OptionChangedFunc;
  rowData: any;
  rowKeyValue: any;
  editableCells: Cell[];
}

const CellText: React.FunctionComponent<ICellTextProps> = ({
  field,
  rowKeyValue,
  rowData, 
  editableCells,
  onOptionChanged,
}) => {
  const value = rowData[field];
  return (<div 
    onClick={() => changeCellTextToCellEditorHandler({ field, rowKeyValue }, editableCells, onOptionChanged)}
  >{value}</div>
  );
};

export default CellText;
