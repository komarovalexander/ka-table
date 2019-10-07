import * as React from 'react';

import CellEditor from '../CellEditor/CellEditor';

export interface ICellEditorStateProps {
  changeToText: () => void;
  field: string;
  rowData: any;
}

const CellEditorState: React.FunctionComponent<ICellEditorStateProps> = ({
  field,
  rowData,
  changeToText,
}) => {
  return (
    <CellEditor
      {...{ field, rowData }}
      changeToText={changeToText}/>
  );
};

export default CellEditorState;
