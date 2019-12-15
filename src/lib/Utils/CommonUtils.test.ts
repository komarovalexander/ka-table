import { isEmpty } from './CommonUtils';

describe('CommonUtils', () => {
  it('isEmpty', () => {
    expect(isEmpty(null)).toStrictEqual(true);
    expect(isEmpty(undefined)).toStrictEqual(true);
    expect(isEmpty('')).toStrictEqual(true);
    expect(isEmpty(false)).toStrictEqual(false);
  });
});
