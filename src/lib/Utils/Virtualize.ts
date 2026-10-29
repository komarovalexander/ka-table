import { Column } from '../Models/Column';
import { VirtualScrolling } from '../Models/VirtualScrolling';
import { checkIndexOdd } from './DataUtils';
import { getColumnWidth } from './ColumnUtils';
import { isTreeChildRow } from './TreeUtils';

export const isVirtualScrollingEnabled = (virtualScrolling?: VirtualScrolling) => {
    return virtualScrolling && virtualScrolling.enabled !== false;
}

export const isHorizontalVirtualScrollingEnabled = (virtualScrolling?: VirtualScrolling) => (
    !!isVirtualScrollingEnabled(virtualScrolling) && !!virtualScrolling!.horizontal
);

// the width of the visible part of the table until it is measured
export const defaultTableWidth = 1600;

// the columns which the virtual scrolling of the columns renders: the indexes of the first and the last one
export interface RenderedColumnsRange {
    first: number;
    last: number;
}

// the visible columns and leftInvisibleCount, rightInvisibleCount columns around them
export const getRenderedColumnsRange = (
    columns: Column[],
    virtualScrolling: VirtualScrolling,
    scrollLeft: number = virtualScrolling.scrollLeft || 0
): RenderedColumnsRange => {
    const { tableWidth = defaultTableWidth, leftInvisibleCount = 2, rightInvisibleCount = 2 } = virtualScrolling;
    let first = -1;
    let last = -1;
    columns.reduce((left, column, index) => {
        const right = left + (getColumnWidth(column) || 0);
        if (right > scrollLeft && left < scrollLeft + tableWidth) {
            first = first === -1 ? index : first;
            last = index;
        }
        return right;
    }, 0);
    if (first === -1) {
        // scrolled further than the columns (e.g. they became narrower): the last ones are rendered
        first = columns.length - 1;
        last = columns.length - 1;
    }
    return { first: Math.max(first - leftInvisibleCount, 0), last: Math.min(last + rightInvisibleCount, columns.length - 1) };
};

export const isSameColumnsRange = (range: RenderedColumnsRange, otherRange: RenderedColumnsRange) => (
    range.first === otherRange.first && range.last === otherRange.last
);

// the spacers in place of the columns which are not rendered
const virtualColumnSpacers = new WeakSet<Column>();
export const isVirtualColumnSpacer = (column: Column) => virtualColumnSpacers.has(column);

/**
 * The columns of the range, the fixed ones and the ones without a numeric width, and the spacers in place of the other ones:
 * the width of a spacer is the width of the columns which it replaces, so the table keeps its width and the columns their places
 */
export const getVirtualizedColumns = (columns: Column[], range: RenderedColumnsRange): Column[] => {
    const virtualizedColumns: Column[] = [];
    let spacerWidth = 0;
    const addSpacer = () => {
        if (spacerWidth) {
            const spacer: Column = { key: `ka-virtual-column-spacer-${virtualizedColumns.length}`, width: spacerWidth };
            virtualColumnSpacers.add(spacer);
            virtualizedColumns.push(spacer);
            spacerWidth = 0;
        }
    };
    columns.forEach((column, index) => {
        const width = getColumnWidth(column);
        if ((index >= range.first && index <= range.last) || column.fixed || width === undefined) {
            addSpacer();
            virtualizedColumns.push(column);
        } else {
            spacerWidth += width;
        }
    });
    addSpacer();
    return virtualizedColumns;
};

// the scrollLeft which shows the column, undefined when the column is shown or is always rendered
export const getScrollLeftToColumn = (columns: Column[], columnKey: string, virtualScrolling: VirtualScrolling): number | undefined => {
    const { scrollLeft = 0, tableWidth = defaultTableWidth } = virtualScrolling;
    let left = 0;
    for (const column of columns) {
        const width = getColumnWidth(column);
        if (column.key === columnKey) {
            if (column.fixed || width === undefined || (left >= scrollLeft && left + width <= scrollLeft + tableWidth)) {
                return undefined;
            }
            return left < scrollLeft ? left : left + width - tableWidth;
        }
        left += width || 0;
    }
    return undefined;
};

// the index of the stripe of oddEvenRows of the row: every row starts a stripe, with 'treeRoots' a child of a tree has the stripe of its root
const getStripeIndex = (data: unknown[], rowIndex: number, isTreeRootsStripe: boolean) => {
    if (!isTreeRootsStripe) {
        return rowIndex;
    }
    let stripeIndex = 0;
    for (let index = 1; index <= rowIndex; index++) {
        if (!isTreeChildRow(data[index])) {
            stripeIndex++;
        }
    }
    return stripeIndex;
};

export const getVirtualized = <TData>(virtualScrolling: VirtualScrolling, data: TData[], isNewRowShown?: boolean, oddEvenRows?: boolean | 'treeRoots') => {
    const virtualizedData: TData[] = [];
    const { scrollTop = 0, bottomInvisibleCount = 5, topInvisibleCount = 0 } = virtualScrolling;
    let { tbodyHeight = 600 } = virtualScrolling;
    let beginHeight = 0;
    let endHeight = 0;
    data.reduce((acc, value) => {
        const itemHeight = virtualScrolling.itemHeight ?
            (
                typeof virtualScrolling.itemHeight === 'number'
                    ? virtualScrolling.itemHeight
                    : virtualScrolling.itemHeight(value)
            )
            : 40;
        const topInvisibleHeight = (itemHeight * topInvisibleCount);
        if (acc >= scrollTop - itemHeight - topInvisibleHeight) {
            if (tbodyHeight + topInvisibleHeight >= -(itemHeight * bottomInvisibleCount)) {
                tbodyHeight = tbodyHeight - itemHeight;
                virtualizedData.push(value);
            } else {
                endHeight += itemHeight;
            }
        } else {
            beginHeight = acc;
            if (!isNewRowShown){
                beginHeight += itemHeight;
            }
        }
        return acc + itemHeight;
    }, 0);

    return {
        beginHeight,
        endHeight,
        virtualizedData,
        isFirstVisibleRowOdd: oddEvenRows
            ? checkIndexOdd(getStripeIndex(data, data.indexOf(virtualizedData[0]), oddEvenRows === 'treeRoots'))
            : undefined
    };
};
