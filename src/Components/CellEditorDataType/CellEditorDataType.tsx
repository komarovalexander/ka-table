import React, { useCallback, useEffect, useState } from 'react';

import { DataType } from '../../Enums/DataType';
import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorBoolean from '../CellEditorBoolean/CellEditorBoolean';
import CellEditorDate from '../CellEditorDate/CellEditorDate';
import CellEditorNumber from '../CellEditorNumber/CellEditorNumber';
import CellEditorString from '../CellEditorString/CellEditorString';

const CellEditorDataType: React.FunctionComponent<ICellEditorProps> = (props) => {
  switch (props.column.dataType) {
    case DataType.Boolean: return <CellEditorBoolean {...props}/>;
    case DataType.Date: return <CellEditorDate {...props}/>;
    case DataType.Number: return <CellEditorNumber {...props}/>;
    default: return <CellEditorString {...props}/>;
  }
};

export default CellEditorDataType;
