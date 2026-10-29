import { VirtualScrolling } from '../Models/VirtualScrolling';
import { checkIndexOdd } from './DataUtils';
import { isTreeChildRow } from './TreeUtils';

export const isVirtualScrollingEnabled = (virtualScrolling?: VirtualScrolling) => {
    return virtualScrolling && virtualScrolling.enabled !== false;
}

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
