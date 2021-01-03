
import defaultOptions from '../defaultOptions';
import { getField, getFieldParts, getLastField, getLastFieldParents } from './ColumnUtils';

describe('ColumnUtils', () => {
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
