import { ActionType } from '../enums';
import { wrapDispatch } from './ActionUtils';

describe('ActionUtils', () => {
  describe('ScrollTable', () => {
    it('Should call scrollTo', () => {
      const baseDispatch = jest.fn();
      const scrollTo = jest.fn();
      const dispath = wrapDispatch({
        columns: [],
        data: [],
        dispatch: baseDispatch,
        rowKeyField: '',
      }, { current : {scrollTo}} as any);

      const scrollLeft = 10;
      dispath({ type: ActionType.ScrollTable, scrollLeft });

      expect(baseDispatch).toHaveBeenCalledTimes(1);
      expect(scrollTo).toHaveBeenCalledTimes(1);
      expect(scrollTo).toHaveBeenCalledWith({ left: scrollLeft });
    });
  });
});
