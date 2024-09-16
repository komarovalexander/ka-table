import { VirtualScrolling } from '../Models/VirtualScrolling';
import { checkIndexOdd } from './DataUtils';

export const isVirtualScrollingEnabled = (virtualScrolling?: VirtualScrolling) => {
    return virtualScrolling && virtualScrolling.enabled !== false;
}

export const getVirtualized = (virtualScrolling: VirtualScrolling, data: any[], isNewRowShown?: boolean, oddEvenRows?: boolean) => {
    const virtualizedData: any[] = [];
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
            ? checkIndexOdd(data?.indexOf(virtualizedData[0]))
            : undefined
    };
};
