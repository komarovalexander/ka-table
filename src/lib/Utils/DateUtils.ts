// a date without time (YYYY-MM-DD) is a local date, as in the date inputs, not the UTC midnight of new Date()
const dateOnlyFormat = /^\d{4}-\d{2}-\d{2}$/;

/**
 * The Date of a date, a timestamp or a string of a date: a date without time (YYYY-MM-DD) is the local midnight.
 * Other objects are dates by their valueOf, e.g. the dates of the libraries of dates
 */
export const getDate = (value: unknown): Date => {
    if (typeof value === 'string' && dateOnlyFormat.test(value)) {
        const [year, month, day] = value.split('-').map((part) => Number(part));
        const date = new Date(year, month - 1, day);
        // new Date() takes the years 0-99 as 1900-1999, and a date input has them while a year is typed
        date.setFullYear(year);
        return date;
    }
    return new Date(value as Date);
};

/**
 * The value of a date input (YYYY-MM-DD) of the local date. The dates of a JSON (strings) and timestamps are accepted too,
 * the value which is not a date (null, undefined, an invalid date) gives ''
 */
export const getDateInputValue = (date?: unknown): string => {
    if (date == null) {
        return '';
    }
    if (typeof date === 'string' && dateOnlyFormat.test(date)) {
        return date;
    }
    const value = getDate(date);
    if (isNaN(value.getTime())) {
        return '';
    }
    return new Date(value.getTime() - value.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};

/**
 * The value of a date input (YYYY-MM-DD, '' when it is cleared) as the local date in the type of the previous value:
 * a string for the dates of a JSON, a number for timestamps, otherwise a Date
 */
export const getDateFromInputValue = (inputValue: string, previousValue?: unknown): Date | string | number | null => {
    if (!inputValue) {
        return null;
    }
    if (typeof previousValue === 'string') {
        return inputValue;
    }
    const date = getDate(inputValue);
    return typeof previousValue === 'number' ? date.getTime() : date;
};
