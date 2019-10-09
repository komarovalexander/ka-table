import React, { useCallback, useEffect, useState } from 'react';

import { addEscEnterKeyEffect } from '../../Utils/EffectUtils';
import { ICellEditorProps } from '../CellEditor/CellEditor';
import CellEditorDataType from '../CellEditorDataType/CellEditorDataType';

const CellEditorState: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column: {
      field,
    },
    rowData,
    close,
    onValueChange,
  } = props;
  const [value, changeValue] = useState(rowData);
  const onValueStateChange = (newValue: any): void => {
    const rowValue = { ...rowData, ...{ [field]: newValue } };
    changeValue(rowValue);
  };

  const closeHandler = useCallback(() => {
    onValueChange({ ...rowData, ...{ [field]: value[field] } });
    close();
  }, [field, close, onValueChange, rowData, value]);

  useEffect(() => {
    return addEscEnterKeyEffect(close, closeHandler);
  }, [close, closeHandler]);

  const stateProps = { ...props, ...{
    close: closeHandler,
    onValueChange: onValueStateChange,
    rowData : value,
  }};

  return (
    <CellEditorDataType {...stateProps} />
  );
};

export default CellEditorState;
