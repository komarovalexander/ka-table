import { Column } from '../Models/Column';
import { compareColumns } from './ColumnUtils';

describe('ColumnUtils', () => {
  describe('compareColumns', () => {
    it('fields are equal', () => {
      const column1: Column = { field: '1' };
      const column2: Column = { field: '1' };
      const areEqual = compareColumns(column1, column2);
      expect(areEqual).toBeTruthy();
    });
    it('fields are equal && keys are different', () => {
      const column1: Column = { key: 1, field: '1' };
      const column2: Column = { key: 2, field: '1' };
      const areEqual = compareColumns(column1, column2);
      expect(areEqual).toBeFalsy();
    });
    it('keys are equal', () => {
      const column1: Column = { key: 1 };
      const column2: Column = { key: 1 };
      const areEqual = compareColumns(column1, column2);
      expect(areEqual).toBeTruthy();
    });
  });
});
