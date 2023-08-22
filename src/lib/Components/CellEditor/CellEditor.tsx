import * as React from 'react';

import CellEditorState from '../CellEditorState/CellEditorState';
import { EditingMode } from '../../enums';
import { ICellEditorProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getCellEditorDispatchHandler } from '../../Utils/CellUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const CellEditor: React.FunctionComponent<ICellEditorProps> = (props) => {
  const {
    childComponents,
    dispatch,
    editingMode
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.cellEditor}`
  }, props, childComponents?.cellEditor);

  return (
    <div {...elementAttributes}>
      {content || (
        editingMode === EditingMode.Cell
        ? <CellEditorState {...props} dispatch={getCellEditorDispatchHandler(dispatch)} autoFocus={true}/>
        : <CellEditorState {...props} />
      )}
    </div>
  );
};

export default CellEditor;
