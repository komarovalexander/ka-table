import { VirtualScrolling } from '../Models/VirtualScrolling';
import { getVirtualized } from './Virtualize';

describe('Virtualize', () => {
  const data: any[] = new Array(100).fill(0).map((_, index) => index);
  describe('getVirtualized', () => {
    it('scrollPosition 0', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollPosition: 0,
        tbodyHeight: 40,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('scrollPosition 100', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollPosition: 100,
        tbodyHeight: 40,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('scrollPosition 900', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollPosition: 900,
        tbodyHeight: 40,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('itemHeight 40', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: 40,
        scrollPosition: 0,
        tbodyHeight: 160,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });
  });
});
