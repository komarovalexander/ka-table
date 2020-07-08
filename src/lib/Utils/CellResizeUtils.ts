import { isNumber } from 'util';

import { DispatchFunc } from '../types';

export const HeadCellResizeStateAction = 'HeadCellResizeStateAction';

export const getValidatedWidth = (newWidth: number, minWidth: number) => {
  if (newWidth < minWidth){
    return minWidth;
  }
  return newWidth;
};

export const getMinWidth = (style: any): number => {
  let minWidth: number = 20;
  const styleMinWidth = style && style.minWidth;
  if (styleMinWidth && isNumber(styleMinWidth)){
    minWidth = styleMinWidth;
  }
  return minWidth;
};

export const headCellDispatchWrapper: (setWidth: any, dispatch: DispatchFunc) => DispatchFunc = (setWidth, dispatch) => (action) => {
  if (action.type === HeadCellResizeStateAction){
    setWidth(action.width);
  }else{
    dispatch(action);
  }
};