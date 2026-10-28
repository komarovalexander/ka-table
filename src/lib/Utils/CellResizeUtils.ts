import { CSSProperties } from 'react';

import { resizeColumn } from '../actionCreators';
import { DispatchFunc } from '../types';

export const isCellResizeShown = (isResizable?: boolean, columnResizing?: boolean): boolean => !!((isResizable !== false) && (columnResizing || isResizable));

/**
 * The handler of the moves of the mouse while a column is resized: ResizeColumn is dispatched only when the width changes,
 * not for every move (e.g. a vertical one or a move at the min width)
 */
export const getMouseMove = (
    currentWidth: number | string | undefined,
    minWidth: number,
    startX: number,
    key: string,
    dispatch: DispatchFunc) => {
    let lastWidth = currentWidth;
    return (event: MouseEvent) => {
        const newWidth = getValidatedWidth(event.screenX - startX, minWidth);
        if (newWidth !== lastWidth) {
            lastWidth = newWidth;
            dispatch(resizeColumn(key, newWidth));
        }
    };
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
