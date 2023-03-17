import * as React from 'react';

import { IEmptyCellsProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getEmptyCellOnDrop } from '../../Utils/PropsUtils';

const EmptyCells: React.FunctionComponent<IEmptyCellsProps> = ({ count, isTh, isColGroup, dispatch }) => {
  return (
    <>
      {[...Array(count)].map((item, index) =>
        isColGroup ?
          <col key={index} />
          : isTh ?
            <th key={index} className={`ka-empty-cell ${defaultOptions.css.theadBackground} ${defaultOptions.css.theadFixed}`}
            onDrop={(event) => getEmptyCellOnDrop(event, dispatch)}
            onDragOver={(event) => {
              event.preventDefault();
            }}/>
            :  <td key={index} className='ka-empty-cell'/>)}
    </>
  );
};

export default EmptyCells;
