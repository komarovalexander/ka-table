import { resizeColumn } from '../actionCreators';
import { DispatchFunc } from '../types';

export const isCellResizeShown = (isResizable?: boolean, columnResizing?: boolean): boolean => !!((isResizable !== false) && (columnResizing || isResizable));

export const getMouseMove = (
  currentWidth: any,
  minWidth: number,
  startX: number,
  key: string,
  dispatch: DispatchFunc) => (event: MouseEvent) => {
  let newWidth = event.screenX - startX;
  if (newWidth !== currentWidth){
    newWidth = getValidatedWidth(newWidth, minWidth);
    dispatch(resizeColumn(key, newWidth));
  }
};

export const getValidatedWidth = (newWidth: number, minWidth: number) => {
  if (newWidth < minWidth){
    return minWidth;
  }
  return newWidth;
};

export const isNumberWidth = (width: any): boolean => width && typeof width === 'number';

export const getMinWidth = (style: any): number => {
  let minWidth: number = 20;
  if (!style){ return minWidth; }

  const styleMinWidth = style.minWidth;
  if (isNumberWidth(styleMinWidth)){
    minWidth = styleMinWidth;
  }
  return minWidth;
};
