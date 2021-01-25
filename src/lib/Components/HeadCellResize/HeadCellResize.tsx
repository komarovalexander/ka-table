import * as React from 'react';

import { resizeColumn } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import {
  getMinWidth, getMouseMove, getValidatedWidth, HeadCellResizeStateAction,
} from '../../Utils/CellResizeUtils';
import { getEventListenerEffect } from '../../Utils/EffectUtils';

const HeadCellResize: React.FunctionComponent<{
  dispatch: DispatchFunc,
  column: Column,
  currentWidth: any,
}> = (props) => {
  const {
    column: { key, style },
    dispatch,
    currentWidth,
  } = props;
  const minWidth = getMinWidth(style);
  return (
    <div className={defaultOptions.css.theadCellResize}
      draggable='false'
      onMouseDown={(mouseDownEvent: any) => {
        mouseDownEvent.preventDefault();
        const startX = mouseDownEvent.screenX - mouseDownEvent.currentTarget.parentElement.offsetWidth;
        const mouseMoveStop = getEventListenerEffect('mousemove', getMouseMove(currentWidth, minWidth, startX, dispatch));
        const mouseUpStop = getEventListenerEffect('mouseup', (event: MouseEvent) => {
          const newWidth = getValidatedWidth(event.screenX - startX, minWidth);
          dispatch(resizeColumn(key, newWidth));
          dispatch({ type: HeadCellResizeStateAction, width: newWidth });
          mouseUpStop();
          mouseMoveStop();
        });
      }}>&nbsp;</div>
  );
};

export default HeadCellResize;
