import {
  getCopyOfArrayAndAddItem, getCopyOfArrayAndDeleteItem, getCopyOfArrayAndInsertOrReplaceItem,
} from './ArrayUtils';

describe('ArrayUtils', () => {
  it('getCopyOfArrayAndAddItem add item to array', () => {
    const array = [1, 2];
    const result = getCopyOfArrayAndAddItem(3, array);

    expect(result).not.toEqual(array);
    expect(result).toStrictEqual([1, 2, 3]);
  });

  it('getCopyOfArrayAndAddItem add item to empty array', () => {
    const result = getCopyOfArrayAndAddItem(1, undefined);
    expect(result).toStrictEqual([1]);
  });

  it('getCopyOfArrayAndInsertOrReplaceItem replace', () => {
    const array = [
      { column1: 1,  column2: 31 },
      { column1: 2,  column2: 32 },
      { column1: 3,  column2: 33 },
      { column1: 4,  column2: 34 },
    ];
    const result = getCopyOfArrayAndInsertOrReplaceItem({ column1: 3,  column2: 333 }, 'column1', array);

    expect(result).not.toEqual(array);
    expect(result).toMatchSnapshot();
  });

  it('getCopyOfArrayAndInsertOrReplaceItem insert', () => {
    const array = [
      { column1: 1,  column2: 31 },
      { column1: 2,  column2: 32 },
      { column1: 4,  column2: 34 },
    ];
    const result = getCopyOfArrayAndInsertOrReplaceItem({ column1: 3,  column2: 333 }, 'column1', array);

    expect(result).not.toEqual(array);
    expect(result).toMatchSnapshot();
  });

  it('getCopyOfArrayAndDeleteItem', () => {
    const array = [
      { column1: 1,  column2: 31 },
      { column1: 2,  column2: 32 },
      { column1: 3,  column2: 33 },
      { column1: 4,  column2: 34 },
    ];
    const result = getCopyOfArrayAndDeleteItem({ column1: 3,  column2: 333 }, 'column1', array);

    expect(result).not.toEqual(array);
    expect(result).toMatchSnapshot();
  });
});
