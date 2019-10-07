import * as React from 'react';

import CellEditor from '../CellEditor/CellEditor';

interface ICellEditorStateProps {
  field: string;
  rowData: any;
  changeToText: () => void;
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
