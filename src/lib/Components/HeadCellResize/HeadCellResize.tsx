import * as React from 'react';

import { resizeColumn } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IHeadCellResizeProps } from '../../props';
import {
    getMinWidth, getMouseMove, getValidatedWidth, isNumberWidth,
} from '../../Utils/CellResizeUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getEventListenerEffect } from '../../Utils/EffectUtils';
import { ColumnResizeContext } from './ColumnResizeContext';

const HeadCellResize: React.FunctionComponent<IHeadCellResizeProps> = (props) => {
    const {
        column: { key, style, colGroup, width },
        dispatch,
        childComponents
    } = props;
    const minWidth = getMinWidth(style, colGroup?.style);
    const currentWidth = width || colGroup?.width || colGroup?.style?.width || style?.width;
    const columnResizeRef = React.useContext(ColumnResizeContext);

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.theadCellResize,
        draggable: false,
        onMouseDown: (mouseDownEvent) => {
            mouseDownEvent.preventDefault();
            const startX = mouseDownEvent.screenX - (isNumberWidth(currentWidth) ? currentWidth : mouseDownEvent.currentTarget.parentElement?.offsetWidth || 0);
            if (columnResizeRef) {
                // the rows are not rendered again while the column is resized: they don't use its width
                columnResizeRef.current = true;
            }
            const mouseMoveStop = getEventListenerEffect('mousemove', getMouseMove(currentWidth, minWidth, startX, key, dispatch));
            const mouseUpStop = getEventListenerEffect('mouseup', (event: MouseEvent) => {
                if (columnResizeRef) {
                    columnResizeRef.current = false;
                }
                // the width where the mouse is released is dispatched, as before: the end of the resize renders the rows with the new width
                dispatch(resizeColumn(key, getValidatedWidth(event.screenX - startX, minWidth)));
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
