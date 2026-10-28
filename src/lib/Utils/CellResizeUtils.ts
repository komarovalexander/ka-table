import { CSSProperties } from 'react';

import { resizeColumn } from '../actionCreators';
import { DispatchFunc } from '../types';

export const isCellResizeShown = (isResizable?: boolean, columnResizing?: boolean): boolean => !!((isResizable !== false) && (columnResizing || isResizable));

export const getMouseMove = (
    currentWidth: number | string | undefined,
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

export const isNumberWidth = (width: unknown): width is number => !!width && typeof width === 'number';

// the minimal width of a column: the first minWidth in pixels of the styles (style, then colGroup.style), 20 without it
export const getMinWidth = (...styles: (CSSProperties | undefined)[]): number => (
    styles.map((style) => style?.minWidth).find(isNumberWidth) ?? 20
);
