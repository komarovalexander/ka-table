import { getDateInputValue } from './DateUtils';

describe('DateUtils', () => {
  it('getDateInputValue', () => {
    const date = new Date(2021, 10, 10, 9, 8, 7);

    expect(getDateInputValue(date)).toBe('2021-11-10');
  });
});
