import { VirtualScrolling } from '../Models/VirtualScrolling';

export const getVirtualized = (virtualScrolling: VirtualScrolling, data: any[]) => {
  const virtualizedData: any[] = [];
  const { scrollPosition = 0, visibleItemsCount = 40 } = virtualScrolling;
  let beginHeight = 0;
  let endHeight = 0;
  data.reduce((acc, value) => {
    const itemHeight = virtualScrolling.itemHeight(value);
    if (acc > scrollPosition - itemHeight) {
      if (virtualizedData.length < visibleItemsCount) {
        virtualizedData.push(value);
      } else {
        endHeight += itemHeight;
      }
    } else {
      beginHeight = acc - itemHeight;
    }
    return acc + itemHeight;
  }, 0);

  return {
    beginHeight,
    endHeight,
    virtualizedData,
  };
};
