import {
  createObjByFields, getParentValue, getValueByColumn, getValueByField, mergeValues,
  replaceValueForField,
} from './DataUtils';

describe('DataUtils', () => {
  describe('getValueByField', () => {
    it('b.c', () => {
      const data = {
        b: {
          c: 1,
        },
      };

      expect(getValueByField(data, 'c', ['b'])).toBe(1);
    });
    it('b.c.x', () => {
      const data = {
        b: {
          c: {
            x: 1,
          },
        },
      };

      expect(getValueByField(data, 'x', ['b', 'c'])).toBe(1);
    });
    it('data is empty', () => {
      const data = {  };

      expect(getValueByField(data, 'c', ['b'])).toBeUndefined();
    });
    it('patch is wrong', () => {
      const data = {
        b: {
          c: 1,
        },
      };

      expect(getValueByField(data, 'a', ['w'])).toBeUndefined();
    });
    it('part path: b', () => {
      const data = {
        b: {
          c: 1,
        },
      };

      expect(getValueByField(data, 'b')).toBe(data.b);
    });
    it('part path: children', () => {
      const data = {
        b: {
          c: 1,
        },
      };

      expect(getValueByField(data, 'c')).toBeUndefined();
    });
    it('one item path', () => {
      const data = {
        b: 1,
      };

      expect(getValueByField(data, 'b')).toBe(1);
    });
    it('false as a value', () => {
      const data = {
        b: false,
      };

      expect(getValueByField(data, 'b')).toBe(false);
    });
  });
  describe('getValueByColumn', () => {
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

      expect(getValueByColumn(data, { key: 'b.c', field: 'd', fieldParents: ['b'] })).toBe(2);
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

  describe('replaceValueForField', () => {
    it('parrents is empty', () => {
      const data = {
        a: 11,
      };

      expect(replaceValueForField(data, 'a', 1)).toEqual({
        a: 1,
      });
    });
    it('parrent is b', () => {
      const data = {
        b: {
          a: 11,
        },
      };

      expect(replaceValueForField(data, 'a', 1, ['b'])).toEqual({
        b: {
          a: 1,
        },
      });
    });
    it('parrent is b and it is undefined', () => {
      const data = { };

      expect(replaceValueForField(data, 'a', 1, ['b'])).toEqual({
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

      expect(replaceValueForField(data, 'a', 1, ['b', 'c'])).toEqual({
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
            x: 1,
          },
        },
      };

      expect(replaceValueForField(data, 'x', 2, ['b', 'c'])).toEqual({
        b: {
          c: {
            x: 2,
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
