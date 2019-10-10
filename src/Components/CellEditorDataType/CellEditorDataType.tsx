import React from 'react';

import { DataType } from '../../Enums/DataType';
import defaultOptions from '../../Models/DefaultOptions';
import { ICellEditorProps } from '../CellEditor/CellEditor';

const CellEditorDataType: React.FunctionComponent<ICellEditorProps> = (props) => {
  switch (props.column.dataType) {
    case DataType.Boolean: return defaultOptions.editors.checkbox(props);
    case DataType.Date: return defaultOptions.editors.date(props);
    case DataType.Number: return defaultOptions.editors.number(props);
    default: return defaultOptions.editors.text(props);
  }
};

export default CellEditorDataType;
