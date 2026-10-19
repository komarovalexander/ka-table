import { isDeepEqual, isEmpty } from './CommonUtils';

describe('CommonUtils', () => {
    it('isEmpty', () => {
        expect(isEmpty(null)).toStrictEqual(true);
        expect(isEmpty(undefined)).toStrictEqual(true);
        expect(isEmpty('')).toStrictEqual(true);
        expect(isEmpty(false)).toStrictEqual(false);
    });
    describe('isDeepEqual', () => {
        it('compares plain objects and arrays by value', () => {
            expect(isDeepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
            expect(isDeepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 3 }] })).toBe(false);
            expect(isDeepEqual({ a: 1 }, { a: 1, b: undefined })).toBe(false);
            expect(isDeepEqual([1, 2], { 0: 1, 1: 2 })).toBe(false);
            expect(isDeepEqual([], [])).toBe(true);
            expect(isDeepEqual(null, {})).toBe(false);
            expect(isDeepEqual(NaN, NaN)).toBe(true);
        });
        it('compares dates by time', () => {
            expect(isDeepEqual(new Date(2020, 1, 2), new Date(2020, 1, 2))).toBe(true);
            expect(isDeepEqual(new Date(2020, 1, 2), new Date(2020, 1, 3))).toBe(false);
        });
        it('compares functions and class instances by reference', () => {
            const func = () => {};
            expect(isDeepEqual({ func }, { func })).toBe(true);
            expect(isDeepEqual({ func }, { func: () => {} })).toBe(false);
            class Item { public a = 1; }
            expect(isDeepEqual(new Item(), new Item())).toBe(false);
        });
        it('supports circular references', () => {
            const a: any = { value: 1 };
            a.self = a;
            const b: any = { value: 1 };
            b.self = b;
            expect(isDeepEqual(a, b)).toBe(true);
        });
    });
});
