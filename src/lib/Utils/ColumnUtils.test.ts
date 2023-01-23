import { getColumn, getField, getFieldParts, getLastField, getLastFieldParents } from './ColumnUtils';

import defaultOptions from '../defaultOptions';

describe('ColumnUtils', () => {
  describe('getColumn', () => {
    it('default', () => {
      const result = getColumn(
        [
          {
            key: 'column1',
          },
          {
            key: 'column2',
          },
          {
            key: 'column3',
          },
        ],
        'column3'
      );
      expect(result).toEqual({
        key: 'column3',
      });
    });
  });
  it('getField from field', () => {
    const field = getField({ key: '2.2', field: '2.3' });
    expect(field).toEqual('2.3');
  });
  it('getField from key', () => {
    const field = getField({ key: '2.2' });
    expect(field).toEqual('2.2');
  });
  it('getLastField', () => {
    const fields = getLastField('prop1.prop2.prop3');
    expect(fields).toEqual('prop3');
  });
  it('getLastFieldParents', () => {
    const fields = getLastFieldParents('prop1.prop2.prop3');
    expect(fields).toEqual(['prop1', 'prop2']);
  });
  it('getFieldParts', () => {
    const fields = getFieldParts('prop1.prop2.prop3');
    expect(fields).toEqual(['prop1', 'prop2', 'prop3']);
  });
  describe('ColumnUtils without delimiter', () => {
    beforeEach(() => {
      defaultOptions.fieldDelimiter = '';
    });
    afterEach(() => {
      defaultOptions.fieldDelimiter = '.';
    });

    it('getField from field', () => {
      const field = getField({ key: '2.2', field: '2.3' });
      expect(field).toEqual('2.3');
    });

    it('getField from key', () => {
      const field = getField({ key: '2.2' });
      expect(field).toEqual('2.2');
    });

    it('getLastField', () => {
      const fields = getLastField('prop1.prop2.prop3');
      expect(fields).toEqual('prop1.prop2.prop3');
    });

    it('getLastFieldParents', () => {
      const fields = getLastFieldParents('prop1.prop2.prop3');
      expect(fields).toEqual([]);
    });

    it('getFieldParts', () => {
      const fields = getFieldParts('prop1.prop2.prop3');
      expect(fields).toEqual(['prop1.prop2.prop3']);
    });
  });
});
