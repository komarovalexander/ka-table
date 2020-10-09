
import { getField, getFieldParts, getLastFieldParents } from './ColumnUtils';

describe('ColumnUtils', () => {
  it('getField from field', () => {
    const field = getField({ key: '2', field: '3' });
    expect(field).toEqual('3');
  });
  it('getField from key', () => {
    const field = getField({ key: '2' });
    expect(field).toEqual('2');
  });
  it('getLastFieldParents', () => {
    const fields = getLastFieldParents('prop1.prop2.prop3');
    expect(fields).toEqual(['prop1', 'prop2']);
  });
  it('getFieldParts', () => {
    const fields = getFieldParts('prop1.prop2.prop3');
    expect(fields).toEqual(['prop1', 'prop2', 'prop3']);
  });
});
