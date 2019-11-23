import { VirtualScrolling } from '../Models/VirtualScrolling';
import { getVirtualized } from './Virtualize';

describe('Virtualize', () => {
  const data: any[] = new Array(200).fill(1);
  describe('getVirtualized', () => {
    it('scrollPosition 0', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollPosition: 0,
        visibleItemsCount: 4,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('scrollPosition 100', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollPosition: 101,
        visibleItemsCount: 4,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('scrollPosition 2000', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollPosition: 2000,
        visibleItemsCount: 4,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('itemHeight 40', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 40,
        scrollPosition: 0,
        visibleItemsCount: 4,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });
  });
});
