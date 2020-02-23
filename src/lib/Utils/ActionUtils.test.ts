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
  describe('SelectAllRows', () => {
    it('Should set selectedRows', () => {
      const onOptionChange = jest.fn();
      const dispath = wrapDispatch({
        columns: [],
        data: [{ id: 1 }, { id: 2 }],
        onOptionChange,
        rowKeyField: 'id',
      });

      dispath(ActionType.SelectAllRows, { });

      expect(onOptionChange).toHaveBeenCalledTimes(1);
      expect(onOptionChange).toHaveBeenCalledWith({ selectedRows: [1, 2] });
    });
  });
  describe('SelectSingleRow', () => {
    it('Should set selectedRows', () => {
      const onOptionChange = jest.fn();
      const dispath = wrapDispatch({
        columns: [],
        data: [{ id: 1 }, { id: 2 }],
        onOptionChange,
        rowKeyField: 'id',
        selectedRows: [1],
      });

      dispath(ActionType.SelectSingleRow, { rowKeyValue: 2 });

      expect(onOptionChange).toHaveBeenCalledTimes(1);
      expect(onOptionChange).toHaveBeenCalledWith({ selectedRows: [2] });
    });
  });
  describe('DeselectAllRows', () => {
    it('Should set selectedRows', () => {
      const onOptionChange = jest.fn();
      const dispath = wrapDispatch({
        columns: [],
        data: [{ id: 1 }, { id: 2 }],
        onOptionChange,
        rowKeyField: 'id',
        selectedRows: [1, 2],
      });

      dispath(ActionType.DeselectAllRows, { });

      expect(onOptionChange).toHaveBeenCalledTimes(1);
      expect(onOptionChange).toHaveBeenCalledWith({ selectedRows: [] });
    });
  });
  describe('DeselectRow', () => {
    it('Should set selectedRows', () => {
      const onOptionChange = jest.fn();
      const dispath = wrapDispatch({
        columns: [],
        data: [{ id: 1 }, { id: 2 }],
        onOptionChange,
        rowKeyField: 'id',
        selectedRows: [1, 2],
      });

      dispath(ActionType.DeselectRow, { rowKeyValue: 2 });

      expect(onOptionChange).toHaveBeenCalledTimes(1);
      expect(onOptionChange).toHaveBeenCalledWith({ selectedRows: [1] });
    });
  });
});
