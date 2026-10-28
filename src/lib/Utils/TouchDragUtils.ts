import * as React from 'react';

// the time of the press of a touch which starts dragging, ms: the drag and drop of a browser which supports touches starts earlier
const pressTime = 600;
// a touch which moves more before the end of the press scrolls the page, px
const moveTolerance = 10;

// the data of a drag by a touch: the handlers of the drag events (getDraggableProps) set the data and read its types
const createDataTransfer = () => {
    const data = new Map<string, string>();
    return {
        dropEffect: 'move',
        effectAllowed: 'move',
        get types() {
            return [...data.keys()];
        },
        clearData: () => data.clear(),
        getData: (format: string) => data.get(format) ?? '',
        setData: (format: string, value: string) => {
            data.set(format, value);
        },
    };
};

/**
 * Drags a row or a column by a touch in the browsers without the drag and drop by touches (e.g. Firefox and Samsung Internet
 * for Android): a long press of a draggable element starts dragging it, the move of the touch drags it over the other elements
 * and the end of the touch drops it. The element gets the drag events which the browser fires for a mouse,
 * so the handlers of the drag and drop (getDraggableProps, the group panel) are the same.
 * A touch which moves before the end of the press scrolls the page; the drag and drop of the browser (Safari for iOS,
 * Chrome for Android) starts before the end of the press, then the touch is not handled.
 */
export const startTouchDrag = (touchStartEvent: React.TouchEvent<HTMLElement>) => {
    const root = touchStartEvent.currentTarget;
    const source = (touchStartEvent.target as Element).closest?.('[draggable="true"]');
    if (touchStartEvent.touches.length !== 1 || !source || !root.contains(source)) {
        return;
    }
    const { clientX: startX, clientY: startY } = touchStartEvent.touches[0];
    const dataTransfer = createDataTransfer();
    let isPressed = false;
    let isDragged = false;
    let isDispatching = false;
    // the element under the touch and whether it accepts the dragged item (cancels dragover)
    let target: Element | null = null;
    let isAccepted = false;

    // a drag event which React handles as the one of a browser; returns true when a handler cancels it
    const dispatch = (element: Element, type: string): boolean => {
        const event = new Event(type, { bubbles: true, cancelable: true });
        Object.defineProperty(event, 'dataTransfer', { value: dataTransfer });
        isDispatching = true;
        try {
            return !element.dispatchEvent(event);
        } finally {
            isDispatching = false;
        }
    };
    const end = (isDropped: boolean) => {
        stop();
        if (isDragged) {
            // as in a browser: the drop for an element which accepts the dragged item, dragleave for another one
            if (target) {
                dispatch(target, isDropped && isAccepted ? 'drop' : 'dragleave');
            }
            dispatch(source, 'dragend');
        }
    };
    const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) {
            return;
        }
        if (!isPressed) {
            if (Math.abs(touch.clientX - startX) > moveTolerance || Math.abs(touch.clientY - startY) > moveTolerance) {
                stop();
            }
            return;
        }
        // the page is not scrolled while the item is dragged
        event.preventDefault();
        if (!isDragged) {
            isDragged = true;
            dispatch(source, 'dragstart');
        }
        const element = document.elementFromPoint?.(touch.clientX, touch.clientY) ?? null;
        if (element !== target) {
            // as in a browser: dragenter of the new element before dragleave of the previous one
            if (element) {
                dispatch(element, 'dragenter');
            }
            if (target) {
                dispatch(target, 'dragleave');
            }
            target = element;
        }
        isAccepted = !!target && dispatch(target, 'dragover');
    };
    const onTouchEnd = (event: TouchEvent) => {
        if (isDragged) {
            // the drop doesn't click the element under the touch
            event.preventDefault();
        }
        end(true);
    };
    const onTouchCancel = () => end(false);
    // the drag and drop of the browser started: it handles the touch, the element under the touch gets its events
    const onDragStart = () => {
        if (!isDispatching) {
            if (isDragged && target) {
                dispatch(target, 'dragleave');
            }
            stop();
        }
    };
    // a long press of a draggable element drags it instead of opening the menu of the browser
    const onContextMenu = (event: Event) => event.preventDefault();
    const timer = setTimeout(() => {
        isPressed = true;
    }, pressTime);

    const stop = () => {
        clearTimeout(timer);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        document.removeEventListener('touchcancel', onTouchCancel);
        source.removeEventListener('dragstart', onDragStart);
        source.removeEventListener('contextmenu', onContextMenu);
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: false });
    document.addEventListener('touchcancel', onTouchCancel);
    source.addEventListener('dragstart', onDragStart);
    source.addEventListener('contextmenu', onContextMenu);
};
