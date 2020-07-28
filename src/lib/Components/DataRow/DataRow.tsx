import React from 'react';

import { kaDefaultOptions } from '../../';
import { reorderRows } from '../../actionCreators';
import { IRowProps } from '../../props';
import { ChildAttributesItem } from '../../types';
import { addElementAttributes, getElementCustomization } from '../../Utils/ComponentUtils';
import { getDraggableProps } from '../../Utils/PropsUtils';
import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
  const {
    dispatch,
    groupColumnsCount,
    isSelectedRow,
    rowKeyValue,
    rowReordering,
    trRef,
  } = props;
  let {
    childComponents : { dataRow },
  } = props;

  if (rowReordering){
    const reorderedRowProps: ChildAttributesItem<IRowProps> = getDraggableProps(rowKeyValue, dispatch, reorderRows, kaDefaultOptions.css.draggedRow, kaDefaultOptions.css.dragOverRow);
    dataRow = addElementAttributes(reorderedRowProps, props, dataRow);
  }

  const { elementAttributes, content } = getElementCustomization({
    className: `${kaDefaultOptions.css.row} ${isSelectedRow ? kaDefaultOptions.css.rowSelected : ''}`
  }, props, dataRow);

  return (
    <tr {...elementAttributes} ref={trRef} >
      <EmptyCells count={groupColumnsCount}/>
      {content
        ? <td className={kaDefaultOptions.css.cell}>{content}</td>
        : <DataRowContent {...props}/>}
    </tr>
  );
};


export default DataRow;
