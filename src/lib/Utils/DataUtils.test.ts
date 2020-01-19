import { getParentValue, getValueByColumn, getValueByField, mergeValues } from './DataUtils';

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

      expect(getValueByColumn(data, { key: 'b.c', field: 'd', parentFields: ['b'] })).toBe(2);
    });
  });

  describe('mergeValues', () => {
    it('simple merge', () => {
      const data = {
        a: 11,
        b: {
          c: 1,
        },
      };

      expect(mergeValues(data, 'c', 2, ['b'])).toEqual({
        a: 11,
        b: {
          c: 2,
        },
      });
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
    it('getParentValue: data is empty', () => {
      const data = {
      };

      expect(getParentValue(data, ['b'])).toEqual({});
    });
  });
});
