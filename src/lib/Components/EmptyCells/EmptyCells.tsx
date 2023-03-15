import * as React from 'react';

import { moveColumnToIndex, ungroupColumn } from '../../actionCreators';

import { IEmptyCellsProps } from '../../props';
import defaultOptions from '../../defaultOptions';

const EmptyCells: React.FunctionComponent<IEmptyCellsProps> = ({ count, isTh, isColGroup, dispatch }) => {
  return (
    <>
      {[...Array(count)].map((item, index) =>
        isColGroup ?
          <col key={index} />
          : isTh ?
            <th key={index} className={`ka-empty-cell ${defaultOptions.css.theadBackground} ${defaultOptions.css.theadFixed}`}
            onDrop={(event) => {
              if (event.dataTransfer.getData('ka-draggableKeyValue-group')){
                const draggableKeyValue = JSON.parse(event.dataTransfer.getData('ka-draggableKeyValue-group'));
                dispatch?.(ungroupColumn(draggableKeyValue));
                dispatch?.(moveColumnToIndex(draggableKeyValue, 0));
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();
            }}/>
            :  <td key={index} className='ka-empty-cell'/>)}
    </>
  );
};

export default EmptyCells;
