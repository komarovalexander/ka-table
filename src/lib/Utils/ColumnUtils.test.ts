
import { getField } from './ColumnUtils';

describe('ColumnUtils', () => {
  it('getField from field', () => {
    const field = getField({ key: '2', field: '3' });
    expect(field).toEqual('3');
  });
  it('getField from key', () => {
    const field = getField({ key: '2' });
    expect(field).toEqual('2');
  });
});
