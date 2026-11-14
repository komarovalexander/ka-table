import { FunctionComponent, useContext, useEffect, useRef } from 'react';

import { resizeColumn } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IHeadCellResizeProps } from '../../props';
import {
    getMinWidth, getMouseMove, getValidatedWidth, isNumberWidth,
} from '../../Utils/CellResizeUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getEventListenerEffect } from '../../Utils/EffectUtils';
import { ColumnResizeContext } from './ColumnResizeContext';

const HeadCellResize: FunctionComponent<IHeadCellResizeProps> = (props) => {
    const {
        column: { key, style, colGroup, width },
        dispatch,
        childComponents
    } = props;
    const minWidth = getMinWidth(style, colGroup?.style);
    const currentWidth = width || colGroup?.width || colGroup?.style?.width || style?.width;
    const columnResizeRef = useContext(ColumnResizeContext);
    // the resize which is in progress: its listeners of window are removed when the cell is unmounted (e.g. the table is removed)
    const stopResizeRef = useRef<() => void>(undefined);
    useEffect(() => () => stopResizeRef.current?.(), []);

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.theadCellResize,
        draggable: false,
        onMouseDown: (mouseDownEvent) => {
            // the other buttons and Ctrl+click open the context menu: on macOS the page doesn't get the mouseup after it
            if (mouseDownEvent.button !== 0 || mouseDownEvent.ctrlKey) {
                return;
            }
            mouseDownEvent.preventDefault();
            const startX = mouseDownEvent.screenX - (isNumberWidth(currentWidth) ? currentWidth : mouseDownEvent.currentTarget.parentElement?.offsetWidth || 0);
            if (columnResizeRef) {
                // the rows are not rendered again while the column is resized: they don't use its width
                columnResizeRef.current = true;
            }
            const stop = () => {
                stopResizeRef.current = undefined;
                if (columnResizeRef) {
                    columnResizeRef.current = false;
                }
                mouseUpStop();
                mouseMoveStop();
            };
            const mouseMoveStop = getEventListenerEffect('mousemove', getMouseMove(currentWidth, minWidth, startX, key, dispatch));
            const mouseUpStop = getEventListenerEffect('mouseup', (event: MouseEvent) => {
                stop();
                // the width where the mouse is released is dispatched, as before: the end of the resize renders the rows with the new width
                dispatch(resizeColumn(key, getValidatedWidth(event.screenX - startX, minWidth)));
            });
            stopResizeRef.current = stop;
        }
    }, props, childComponents.headCellResize);

    return (
        <div {...elementAttributes}>{content || <>&nbsp;</>}</div>
    );
};

export default HeadCellResize;
