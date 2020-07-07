import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { SortingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import HeadCellContent from '../HeadCellContent/HeadCellContent';
import HeadCellResize, { HeadCellResizeStateAction } from '../HeadCellResize/HeadCellResize';

export interface IHeadCellProps {
  areAllRowsSelected: boolean;
  column: Column;
  dispatch: DispatchFunc;
  sortingMode: SortingMode;
}

const HeadCell: React.FunctionComponent<IHeadCellProps> = (props) => {
  const {
    column: { style, isResizable },
    dispatch
  } = props;
  const [width, setWidth] = React.useState(style ? style.width : undefined);
  const stateStyle = {...style, width};
  return (
    <th scope='col' style={stateStyle} className={defaultOptions.css.theadCell}>
      <div className={defaultOptions.css.theadCellWrapper}>
        <HeadCellContent {...props}/>
        {isResizable && (
          <HeadCellResize {...props}
            currentWidth={width}
            dispatch={(action) => {
            if (action.type === HeadCellResizeStateAction){
              setWidth(action.width);
            }else{
              dispatch(action);
            }
          }}/>
        )}
      </div>
    </th>
  );
};

export default HeadCell;
