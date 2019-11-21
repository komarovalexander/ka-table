import { Column } from '../Models/Column';
import { getRowValueByColumn } from './RowUtils';

describe('RowUtils', () => {
  describe('getRowValueByColumn', () => {
    it('get by field', () => {
      const rowData: any = { fieldName: 'fieldNameValue', fieldKey: 'fieldKeyValue' };
      const column: Column = { key: 'fieldKey', field: 'fieldName' };
      const value = getRowValueByColumn(rowData, column);
      expect(value).toBe('fieldNameValue');
    });
    it('get by field', () => {
      const rowData: any = { fieldName: 'fieldNameValue', fieldKey: 'fieldKeyValue' };
      const column: Column = { key: 'fieldKey' };
      const value = getRowValueByColumn(rowData, column);
      expect(value).toBe('fieldKeyValue');
    });
  });
});
