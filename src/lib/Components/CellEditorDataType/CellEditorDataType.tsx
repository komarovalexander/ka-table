import { FunctionComponent } from 'react';

import { DataType } from '../../enums';
import { ICellEditorProps } from '../../props';
import CellEditorBoolean from '../CellEditorBoolean/CellEditorBoolean';
import CellEditorDate from '../CellEditorDate/CellEditorDate';
import CellEditorNumber from '../CellEditorNumber/CellEditorNumber';
import CellEditorString from '../CellEditorString/CellEditorString';

const CellEditorDataType: FunctionComponent<ICellEditorProps> = (props) => {
    switch (props.column.dataType) {
    case DataType.Boolean: return <CellEditorBoolean {...props} />;
    case DataType.Date: return <CellEditorDate {...props} />;
    case DataType.Number: return <CellEditorNumber {...props} />;
    default: return <CellEditorString {...props} />;
    }
};

export default CellEditorDataType;
