import { getDateFromInputValue, getDateInputValue } from './DateUtils';

describe('DateUtils', () => {
    it('getDateInputValue', () => {
        const date = new Date(2021, 10, 10, 9, 8, 7);

        expect(getDateInputValue(date)).toBe('2021-11-10');
    });
    it('getDateInputValue of the dates of a JSON and timestamps', () => {
        const date = new Date(2021, 10, 10, 9, 8, 7);
        // a date without time is not shifted by the time zone
        expect(getDateInputValue('2021-11-10')).toBe('2021-11-10');
        expect(getDateInputValue(date.toISOString())).toBe('2021-11-10');
        expect(getDateInputValue(date.getTime())).toBe('2021-11-10');
        expect(getDateInputValue('not a date')).toBe('');
    });
    it('getDateFromInputValue keeps the type of the previous value', () => {
        expect(getDateFromInputValue('', new Date(2020, 0, 1))).toBeNull();
        expect(getDateFromInputValue('2021-11-10')).toEqual(new Date(2021, 10, 10));
        expect(getDateFromInputValue('2021-11-10', new Date(2020, 0, 1))).toEqual(new Date(2021, 10, 10));
        expect(getDateFromInputValue('2021-11-10', '2020-01-01')).toBe('2021-11-10');
        expect(getDateFromInputValue('2021-11-10', 0)).toBe(new Date(2021, 10, 10).getTime());
    });
});
