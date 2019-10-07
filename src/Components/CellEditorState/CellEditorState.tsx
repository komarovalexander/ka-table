import React, { useCallback, useEffect, useState } from 'react';

import { KeyboardEnum } from '../../Enums/KeyboardEnum';
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
  };

  const onChangeToTextHandler = useCallback(() => {
    onRowDataChanged({ ...rowData, ...{ [field]: value[field] } });
    onChangeToText();
  }, [field, onChangeToText, onRowDataChanged, rowData, value]);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.keyCode === KeyboardEnum.Esc) {
        onChangeToText();
      }

      if (event.keyCode === KeyboardEnum.Enter) {
        onChangeToTextHandler();
      }
    };
    window.addEventListener('keyup', handleKeyboard);

    return () => {
      window.removeEventListener('keyup', handleKeyboard);
    };
  }, [onChangeToText, onChangeToTextHandler]);
  return (
    <CellEditor
      field={field}
      rowData={value}
      onValueChange={onValueStateChange}
      onChangeToText={onChangeToTextHandler}/>
  );
};

export default CellEditorState;
