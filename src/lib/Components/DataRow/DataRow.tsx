import { addElementAttributes, getElementCustomization } from '../../Utils/ComponentUtils';

import { ChildAttributesItem } from '../../types';
import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';
import { IRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getDraggableProps } from '../../Utils/PropsUtils';
import { reorderRows } from '../../actionCreators';

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
  const {
    dispatch,
    groupColumnsCount,
    isSelectedRow,
    rowKeyValue,
    rowReordering,
    trRef,
    childComponents
  } = props;
  let dataRow = childComponents.dataRow;

  if (rowReordering){
    const reorderedRowProps: ChildAttributesItem<IRowProps> = getDraggableProps(rowKeyValue, dispatch, reorderRows, defaultOptions.css.draggedRow, defaultOptions.css.dragOverRow);
    dataRow = addElementAttributes(reorderedRowProps, props, dataRow);
  }

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}`
  }, props, dataRow);

  return (
    <tr ref={trRef} {...elementAttributes}>
      {content
        ? <>{content}</>
        : (
        <>
          <EmptyCells count={groupColumnsCount} childComponents={childComponents}/>
          <DataRowContent {...props}/>
        </>
        )
      }
    </tr>
  );
};


export default DataRow;
