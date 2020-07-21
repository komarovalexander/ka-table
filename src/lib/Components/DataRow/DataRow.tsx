import React from 'react';

import { reorderRows } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IRowProps } from '../../props';
import { ChildAttributesItem } from '../../types';
import { addElementAttributes, getElementCustomization } from '../../Utils/ComponentUtils';
import { getDraggableProps } from '../../Utils/PropsUtils';
import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
  const {
    childComponents : { dataRow },
    dispatch,
    groupColumnsCount,
    isSelectedRow,
    rowKeyValue,
    trRef,
  } = props;

  const reorderedRowProps: ChildAttributesItem<IRowProps> = getDraggableProps(rowKeyValue, dispatch, reorderRows, 'ka-dragged-row', 'ka-drag-over-row');

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}`
  }, props, addElementAttributes(reorderedRowProps, props, dataRow));

  return (
    <tr {...elementAttributes} ref={trRef} >
      <EmptyCells count={groupColumnsCount}/>
      {content
        ? <td className={defaultOptions.css.cell}>{content}</td>
        : <DataRowContent {...props}/>}
    </tr>
  );
};


export default DataRow;
