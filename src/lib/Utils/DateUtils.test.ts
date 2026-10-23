import { getDate, getDateFromInputValue, getDateInputValue } from './DateUtils';

describe('DateUtils', () => {
    it('getDateInputValue', () => {
        const date = new Date(2021, 10, 10, 9, 8, 7);

        expect(getDateInputValue(date)).toBe('2021-11-10');
    });
    it('getDateInputValue of a value which is not a date', () => {
        expect(getDateInputValue(null)).toBe('');
        expect(getDateInputValue(undefined)).toBe('');
        expect(getDateInputValue('abc')).toBe('');
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
    it('getDate of a date without time is the local midnight', () => {
        expect(getDate('2021-11-08')).toEqual(new Date(2021, 10, 8));
        // a date input has these years while a year is typed
        expect(getDate('0002-11-08').getFullYear()).toBe(2);
        expect((getDateFromInputValue('0020-11-08', new Date()) as Date).getFullYear()).toBe(20);
        expect(getDate('2021-11-08T10:00:00Z')).toEqual(new Date(Date.UTC(2021, 10, 8, 10)));
        expect(getDate(0)).toEqual(new Date(0));
    });
});
