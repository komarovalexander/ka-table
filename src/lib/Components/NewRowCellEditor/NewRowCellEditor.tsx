import * as React from 'react';

import CellEditor, { ICellEditorProps } from '../CellEditor/CellEditor';

const NewRowCellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    column: {newRowCellEditor},
  } = props;
  if (newRowCellEditor){
    return newRowCellEditor(props);
  }
  return <CellEditor {...props} />;
};

export default NewRowCellEditor;
