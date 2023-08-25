import { getVirtualized, isVirtualScrollingEnabled } from './Virtualize';

import { VirtualScrolling } from '../Models/VirtualScrolling';

describe('Virtualize', () => {
  const data: any[] = new Array(100).fill(0).map((_, index) => index);
  describe('getVirtualized', () => {
    it('scrollTop 0', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollTop: 0,
        tbodyHeight: 40,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('scrollTop 100', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollTop: 100,
        tbodyHeight: 40,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('scrollTop 100 bottomInvisibleCount', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollTop: 100,
        tbodyHeight: 40,
        bottomInvisibleCount: 10
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });
    it('scrollTop 900 topInvisibleCount', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollTop: 900,
        tbodyHeight: 40,
        topInvisibleCount: 10
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('scrollTop 900', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollTop: 900,
        tbodyHeight: 40,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('itemHeight 40', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: 40,
        scrollTop: 0,
        tbodyHeight: 160,
      };
      const result = getVirtualized(virtualScrolling, data);

      expect(result).toMatchSnapshot();
    });

    it('with new row', () => {
      const virtualScrolling: VirtualScrolling = {
        itemHeight: () => 10,
        scrollTop: 100,
        tbodyHeight: 40,
      };
      const result = getVirtualized(virtualScrolling, data, true);

      expect(result).toMatchSnapshot();
    });
  });

  it('isVirtualScrollingEnabled', () => {
    expect(isVirtualScrollingEnabled()).toBeFalsy();
    expect(isVirtualScrollingEnabled({})).toBeTruthy();
    expect(isVirtualScrollingEnabled({ enabled: true })).toBeTruthy();
    expect(isVirtualScrollingEnabled({ enabled: false })).toBeFalsy();
  });
});
