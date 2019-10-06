import { getCopyOfArrayAndAddItem } from './ArrayUtils';

describe('ArrayUtils', () => {
  it('getCopyOfArrayAndAddItem add item to array', () => {
    const array = [1, 2];
    const result = getCopyOfArrayAndAddItem(3, array);

    expect(result).not.toEqual(array);
    expect(result).toStrictEqual([1,2,3]);
  });

  it('getCopyOfArrayAndAddItem add item to empty array', () => {
    const result = getCopyOfArrayAndAddItem(1, undefined);    
    expect(result).toStrictEqual([1]);
  });
});
