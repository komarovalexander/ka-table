import * as React from 'react';

interface ICellEditorProps {
  value: any;
}

const CellEditor: React.FunctionComponent<ICellEditorProps> = ({ value }) => {
  return (
    <input type='text' value={value} />
  );
};

export default CellEditor;
