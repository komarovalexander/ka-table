
import {
  getMinWidth, getValidatedWidth, headCellDispatchWrapper, HeadCellResizeStateAction,
} from './CellResizeUtils';

describe('CellUtils', () => {
  describe('headCellDispatchWrapper', () => {
    it('should scheck action', () => {
      const setWidth = jest.fn();
      const dispatch = jest.fn();

      const headCellDispatch = headCellDispatchWrapper(setWidth, dispatch);
      expect(setWidth.mock.calls.length).toBe(0);
      expect(dispatch.mock.calls.length).toBe(0);

      headCellDispatch({ type: HeadCellResizeStateAction });
      expect(setWidth.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls.length).toBe(0);

      headCellDispatch({ type: 'smth' });
      expect(setWidth.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls.length).toBe(1);
    });
  });
  describe('getMinWidth', () => {
    it('default', () => {
      expect(getMinWidth({})).toBe(20);
    });
    it('should get value from minWidth', () => {
      expect(getMinWidth({ minWidth: 200 })).toBe(200);
    });
    it('should skip minWidth in case of percents', () => {
      expect(getMinWidth({ minWidth: '100%' })).toBe(20);
    });
  });
  describe('getValidatedWidth', () => {
    it('newWidth less than minWidth', () => {
      expect(getValidatedWidth(20, 40)).toBe(40);
    });
    it('newWidth more than minWidth', () => {
      expect(getValidatedWidth(50, 40)).toBe(50);
    });
  });
});
