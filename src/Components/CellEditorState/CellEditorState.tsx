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
    onChangeToText,
    onValueChange,
  } = props;
  const [value, changeValue] = useState(rowData);
  const onValueStateChange = (newValue: any): void => {
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

  const stateProps = { ...props, ...{
    onChangeToText: onChangeToTextHandler,
    onValueChange: onValueStateChange,
    rowData : value,
  }};

  return (
    <CellEditorDataType {...stateProps} />
  );
};

export default CellEditorState;
