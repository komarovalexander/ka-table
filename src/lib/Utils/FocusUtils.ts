import defaultOptions from '../defaultOptions';

const isSticky = (element: Element | null | undefined) => !!element && getComputedStyle(element).position === 'sticky';

/**
 * The area of the scrollport of the wrapper which is not covered by the sticky header and by the fixed
 * columns of the row of the cell (in the coordinates of getBoundingClientRect)
 */
export const getVisibleArea = (wrapper: HTMLElement, cell: HTMLTableCellElement) => {
    const wrapperRect = wrapper.getBoundingClientRect();
    const area = {
        top: wrapperRect.top + wrapper.clientTop,
        left: wrapperRect.left + wrapper.clientLeft,
        right: wrapperRect.left + wrapper.clientLeft + wrapper.clientWidth,
        bottom: wrapperRect.top + wrapper.clientTop + wrapper.clientHeight,
    };
    // the sticky cells of the header stay at the top of the scrollport while thead itself is scrolled away:
    // the covered area ends at the bottom of the lowest sticky cell (there can be several header rows)
    Array.from(cell.closest('table')?.tHead?.querySelectorAll('th, td') ?? []).forEach((headerCell) => {
        if (isSticky(headerCell)) {
            area.top = Math.max(area.top, headerCell.getBoundingClientRect().bottom);
        }
    });
    Array.from(cell.parentElement?.children ?? []).forEach((sibling) => {
        if (sibling === cell || !isSticky(sibling)) {
            return;
        }
        if (sibling.classList.contains(defaultOptions.css.fixedLeft)) {
            area.left = Math.max(area.left, sibling.getBoundingClientRect().right);
        } else if (sibling.classList.contains(defaultOptions.css.fixedRight)) {
            area.right = Math.min(area.right, sibling.getBoundingClientRect().left);
        }
    });
    return area;
};

// the scrolling which shows the segment [start, end] inside [areaStart, areaEnd]:
// a segment which doesn't fit is aligned to the start, unless it already overlaps the area
const getScrollDelta = (start: number, end: number, areaStart: number, areaEnd: number) => {
    if (end - start > areaEnd - areaStart) {
        return end <= areaStart || start >= areaEnd ? start - areaStart : 0;
    }
    if (start < areaStart) {
        return start - areaStart;
    }
    return end > areaEnd ? end - areaEnd : 0;
};

/**
 * Scrolls the wrapper, so the cell is not covered by the sticky header and by the fixed columns
 */
export const scrollCellIntoVisibleArea = (wrapper: HTMLElement, cell: HTMLTableCellElement) => {
    const area = getVisibleArea(wrapper, cell);
    const rect = cell.getBoundingClientRect();
    if (!isSticky(cell)) {
        wrapper.scrollLeft += getScrollDelta(rect.left, rect.right, area.left, area.right);
    }
    wrapper.scrollTop += getScrollDelta(rect.top, rect.bottom, area.top, area.bottom);
};

/**
 * Focuses the cell: the browser would scroll it into the scrollport of the wrapper only, where the sticky
 * header and the fixed columns can cover it, so the wrapper is scrolled here and the other scrollable
 * ancestors (e.g. the page) are scrolled by the browser
 */
export const focusCell = (cell: HTMLTableCellElement) => {
    const wrapper = cell.closest<HTMLElement>(`.${defaultOptions.css.tableWrapper}`);
    if (!wrapper) {
        cell.focus();
        return;
    }
    cell.focus({ preventScroll: true });
    scrollCellIntoVisibleArea(wrapper, cell);
    cell.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
};
