import { DispatchFunc } from '../types';

export const HeadCellResizeStateAction = 'HeadCellResizeStateAction';

export const isCellResizeShown = (isResizable?: boolean, columnResizing?: boolean): boolean => !!((isResizable !== false) && (columnResizing || isResizable));

export const getMouseMove = (
  currentWidth: any,
  minWidth: number,
  startX: number,
  dispatch: DispatchFunc) => (event: MouseEvent) => {
  let newWidth = event.screenX - startX;
  if (newWidth !== currentWidth){
    newWidth = getValidatedWidth(newWidth, minWidth);
    dispatch({ type: HeadCellResizeStateAction, width: newWidth });
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
  const styleMinWidth = style && style.minWidth;
  if (isNumberWidth(styleMinWidth)){
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
