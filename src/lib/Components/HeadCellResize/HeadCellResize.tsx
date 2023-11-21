import * as React from 'react';

import { resizeColumn } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IHeadCellResizeProps } from '../../props';
import {
    getMinWidth, getMouseMove, getValidatedWidth, isNumberWidth,
} from '../../Utils/CellResizeUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getEventListenerEffect } from '../../Utils/EffectUtils';

const HeadCellResize: React.FunctionComponent<IHeadCellResizeProps> = (props) => {
    const {
        column: { key, style, colGroup, width },
        dispatch,
        childComponents
    } = props;
    const minWidth = getMinWidth(style) || getMinWidth(colGroup?.style);
    const currentWidth = width ||  colGroup?.width || colGroup?.style?.width || style?.width ;

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.theadCellResize,
        draggable: false,
        onMouseDown: (mouseDownEvent: any) => {
            mouseDownEvent.preventDefault();
            const startX = mouseDownEvent.screenX - (isNumberWidth(currentWidth) ? currentWidth : mouseDownEvent.currentTarget.parentElement.offsetWidth);
            const mouseMoveStop = getEventListenerEffect('mousemove', getMouseMove(currentWidth, minWidth, startX, key, dispatch));
            const mouseUpStop = getEventListenerEffect('mouseup', (event: MouseEvent) => {
                const newWidth = getValidatedWidth(event.screenX - startX, minWidth);
                dispatch(resizeColumn(key, newWidth));
                mouseUpStop();
                mouseMoveStop();
            });
        }
    }, props, childComponents.headCellResize);

    return (
        <div {...elementAttributes}>{content || <>&nbsp;</>}</div>
    );
};

export default HeadCellResize;
