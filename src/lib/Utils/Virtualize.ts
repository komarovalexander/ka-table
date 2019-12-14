import { VirtualScrolling } from '../Models/VirtualScrolling';

export const getVirtualized = (virtualScrolling: VirtualScrolling, data: any[]) => {
  const virtualizedData: any[] = [];
  const { scrollPosition = 0 } = virtualScrolling;
  let { tbodyHeight = 600 } = virtualScrolling;
  let beginHeight = 0;
  let endHeight = 0;
  data.reduce((acc, value) => {
    const itemHeight = virtualScrolling.itemHeight ?
      (
        virtualScrolling.itemHeight(value)
      )
      : 40;
    if (acc >= scrollPosition - itemHeight) {
      if (tbodyHeight >= -(itemHeight * 5)) {
        tbodyHeight = tbodyHeight - itemHeight;
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
