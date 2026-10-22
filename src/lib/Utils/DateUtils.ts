// a date without time (YYYY-MM-DD) is a local date, as in the date inputs, not the UTC midnight of new Date()
const dateOnlyFormat = /^\d{4}-\d{2}-\d{2}$/;

/**
 * The value of a date input (YYYY-MM-DD) of the local date. The dates of a JSON (strings) and timestamps are accepted too,
 * the value which is not a date gives ''
 */
export const getDateInputValue = (date: Date | string | number): string => {
    if (typeof date === 'string' && dateOnlyFormat.test(date)) {
        return date;
    }
    const value = new Date(date);
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
    // new Date('YYYY-MM-DD') is the UTC midnight https://github.com/komarovalexander/ka-table/issues/279
    const utcDate = new Date(inputValue);
    const date = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    return typeof previousValue === 'number' ? date.getTime() : date;
};
