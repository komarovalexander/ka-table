import { ActionType } from '../enums';
import { wrapDispatch } from './ActionUtils';

describe('ActionUtils', () => {
  describe('ScrollTable', () => {
    it('Should call scrollTo', () => {
      const onOptionChange = jest.fn();
      const scrollTo = jest.fn();
      const dispath = wrapDispatch({
        columns: [],
        data: [],
        onOptionChange,
        rowKeyField: '',
      }, { current : {scrollTo}} as any);

      const scrollLeft = 10;
      dispath(ActionType.ScrollTable, { scrollLeft });

      expect(onOptionChange).toHaveBeenCalledTimes(0);
      expect(scrollTo).toHaveBeenCalledTimes(1);
      expect(scrollTo).toHaveBeenCalledWith({ left: scrollLeft });
    });
  });
});
