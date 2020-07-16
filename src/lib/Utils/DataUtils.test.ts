import { Column } from '../models';
import { createObjByFields, getParentValue, getValueByColumn, replaceValue } from './DataUtils';

describe('DataUtils', () => {
  describe('getValueByColumn', () => {
    it('b.c', () => {
      const data = {
        b: {
          c: 1,
        },
      };

      expect(getValueByColumn(data, { key: 'b.c' })).toBe(1);
    });
    it('b.c.x', () => {
      const data = {
        b: {
          c: {
            x: 1,
          },
        },
      };

      expect(getValueByColumn(data, { key: 'b.c.x' })).toBe(1);
    });
    it('data is empty', () => {
      const data = {  };

      expect(getValueByColumn(data, { key: 'b.c' })).toBeUndefined();
    });
    it('patch is wrong', () => {
      const data = {
        b: {
          c: 1,
        },
      };

      expect(getValueByColumn(data, { key: 'w.a' })).toBeUndefined();
    });
    it('part path: b', () => {
      const data = {
        b: {
          c: 1,
        },
      };

      expect(getValueByColumn(data, { key: 'b' })).toBe(data.b);
    });
    it('part path: children', () => {
      const data = {
        b: {
          c: 1,
        },
      };

      expect(getValueByColumn(data, { key: 'c' })).toBeUndefined();
    });
    it('one item path', () => {
      const data = {
        b: 1,
      };

      expect(getValueByColumn(data, { key: 'b' })).toBe(1);
    });
    it('false as a value', () => {
      const data = {
        b: false,
      };

      expect(getValueByColumn(data, { key: 'b' })).toBe(false);
    });

    it('value from key', () => {
      const data = {
        b: 3,
      };

      expect(getValueByColumn(data, { key: 'b' })).toBe(3);
    });
    it('value from field', () => {
      const data = {
        b: {
          c: 1,
          d: 2,
        },
      };

      expect(getValueByColumn(data, { key: 'b.c', field: 'b.d' })).toBe(2);
    });
  });

  describe('getParentValue', () => {
    it('getParentValue', () => {
      const data = {
        a: 11,
        b: {
          c: 1,
        },
      };

      expect(getParentValue(data, ['b'])).toEqual({
        c: 1,
      });
    });
    it('getParentValue: data is undefined', () => {
      const data = {
      };

      expect(getParentValue(data, ['b'])).toEqual(undefined);
    });
  });

  describe('replaceValue', () => {
    it('parrents is empty', () => {
      const data = {
        a: 11,
      };
      const column: Column = {key : 'a'};

      expect(replaceValue(data, column, 1)).toEqual({
        a: 1,
      });
    });
    it('parrent is b', () => {
      const data = {
        b: {
          a: 11,
        },
      };
      const column: Column = {key : 'b.a'};
      expect(replaceValue(data, column, 1)).toEqual({
        b: {
          a: 1,
        },
      });
    });
    it('parrent is b and it is undefined', () => {
      const data = { };
      const column: Column = {key : 'b.a'};

      expect(replaceValue(data, column, 1)).toEqual({
        b: {
          a: 1,
        },
      });
    });
    it('parrent is b.c', () => {
      const data = {
        b: {
          c: {
            a: 11,
          },
        },
      };
      const column: Column = {key : 'b.c.a'};

      expect(replaceValue(data, column, 1)).toEqual({
        b: {
          c: {
            a: 1,
          },
        },
      });
    });
    it('parrent is b.c, c is undefined', () => {
      const data = {
        b: {
        },
      };
      const column: Column = {key : 'b.c.a'};

      expect(replaceValue(data, column, 1)).toEqual({
        b: {
          c: {
            a: 1,
          },
        },
      });
    });
    it('parrent is b.c, b is undefined', () => {
      const data = {
      };
      const column: Column = {key : 'b.c.a'};

      expect(replaceValue(data, column, 1)).toEqual({
        b: {
          c: {
            a: 1,
          },
        },
      });
    });
    it('parrent is b.c.x', () => {
      const data = {
        b: {
          c: {
            x: {
              a: 1,
            },
          },
        },
      };
      const column: Column = { key : 'b.c.x.a' };

      expect(replaceValue(data, column, 2)).toEqual({
        b: {
          c: {
            x: {
              a: 2,
            },
          },
        },
      });
    });
  });

  describe('createObjByFields', () => {
    it('parrents is empty', () => {
      expect(createObjByFields([], 'a', 1)).toEqual({
        a: 1,
      });
    });
    it('has parrents b', () => {
      expect(createObjByFields(['b'], 'a', 1)).toEqual({
        b: {
          a: 1,
        },
      });
    });
    it('has parrents b.c', () => {
      expect(createObjByFields(['b', 'c'], 'a', 1)).toEqual({
        b: {
          c: {
            a: 1,
          },
        },
      });
    });
  });
});
