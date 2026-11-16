import { DataType, FilterOperatorName } from '../enums';
import { FormatFunc, SearchFunc } from '../types';
import {
    filterByHeaderFilter,
    filterData,
    getDefaultOperatorForType,
    getRowEditableCells,
    isFilteredByFilterRow,
    predefinedFilterOperators,
    searchData,
} from './FilterUtils';

import { Column } from '../Models/Column';
import { createElement } from 'react';

describe('FilterUtils', () => {
    it('getRowEditableCells should return required cells from table EditableCells', () => {
        const rowEditableCells = getRowEditableCells(10, [{
            columnKey: '10',
            rowKeyValue: 10,
        }, {
            columnKey: '10',
            rowKeyValue: 2,
        }]);
        expect(rowEditableCells).toMatchSnapshot();
    });

    it('getDefaultOperatorForType', () => {
        expect(getDefaultOperatorForType(DataType.Number)).toBe('=');
        expect(getDefaultOperatorForType(DataType.Object)).toBe('=');
        expect(getDefaultOperatorForType(DataType.String)).toBe('contains');
    });

    describe('filterData', () => {
        const data = [
            { id: 1, name: 'Mike Wazowski', score: 80, passed: true, date: new Date(Date.UTC(2021, 11, 20, 9)) },
            { id: 2, name: 'Billi Bob', score: 55, passed: false, date: new Date(Date.UTC(2021, 11, 20, 13)) },
            { id: 3, name: 'Tom Williams', score: 45, passed: false, date: new Date(Date.UTC(2021, 10, 20, 13)) },
            { id: 4, name: 'Kurt Cobain', score: 75, passed: true, date: new Date(Date.UTC(2021, 11, 19, 13)) },
            { id: 5, name: 'Marshall Bruce', score: 77, passed: true, date: null },
            { id: 6, name: 'Sunny Fox', score: 33, passed: false, date: new Date(Date.UTC(2021, 11, 17, 13)) },
        ];
        it('one item', () => {
            const columns = [{
                filterRowValue: 'Billi Bob',
                key: 'name',
            }];
            const result = filterData(data, columns);
            expect(result).toMatchSnapshot();
        });

        it('by date', () => {
            // the local dates: the rows of the local day of the filter are found in any time zone
            const dates = [
                { id: 1, date: new Date(2021, 11, 20, 0, 0) },
                { id: 2, date: new Date(2021, 11, 20, 23, 59) },
                { id: 3, date: new Date(2021, 11, 19, 23, 59) },
                { id: 4, date: new Date(2021, 11, 21, 0, 0) },
                { id: 5, date: null },
            ];
            const columnsDate: Column[] = [{ dataType: DataType.Date, filterRowValue: new Date(2021, 11, 20, 19, 18, 12), key: 'date' }];
            expect(filterData(dates, columnsDate).map((d) => d.id)).toEqual([1, 2]);
        });

        it('IsEmpty for date', () => {
            const columnsDate: Column[] = [
                {
                    dataType: DataType.Date,
                    filterRowOperator: FilterOperatorName.IsEmpty,
                    key: 'date',
                },
            ];
            const result = filterData(data, columnsDate);
            expect(result).toMatchSnapshot();
        });

        it('IsNotEmpty for date', () => {
            const columnsDate: Column[] = [
                {
                    dataType: DataType.Date,
                    filterRowOperator: FilterOperatorName.IsNotEmpty,
                    key: 'date',
                },
            ];
            const result = filterData(data, columnsDate);
            expect(result).toMatchSnapshot();
        });

        it('two item', () => {
            const columns = [{
                filterRowValue: 'Billi Bob',
                key: 'name',
            }, {
                dataType: DataType.Number,
                filterRowValue: 45,
                key: 'score',
            }];
            const result = filterData(data, columns);
            expect(result).toMatchSnapshot();
        });

        it('custom filter', () => {
            const columns = [{
                dataType: DataType.Number,
                filterRowValue: 45,
                key: 'score',
            }];
            const result = filterData(data, columns, ({ column }) => {
                if (column.key === 'score'){
                    return (value, filterValue) => value !== filterValue;
                }
            });
            expect(result).toMatchSnapshot();
        });

        it('custom filter: column with data type = "date" should not change filterRowValue', () => {
            const columns = [{
                dataType: DataType.Date,
                filterRowValue: ['date 1'],
                key: 'date',
            }];
            const result = filterData(data, columns, ({ column }) => {
                if (column.key === 'date'){
                    return (value: unknown, filterValue: string[]) => {
                        return filterValue[0] === 'date 1' && value === data[0].date
                    };
                }
            });
            expect(result).toMatchSnapshot();
        });

        it('does not filter the column with an unknown filterOperator and warns once', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const columns = [{
                filterRowOperator: 'unknownOperator',
                filterRowValue: 'Billi Bob',
                key: 'name',
            }];
            expect(filterData(data, columns)).toEqual(data);
            filterData(data, columns);
            expect(warn).toHaveBeenCalledTimes(1);
            expect(warn).toHaveBeenCalledWith('ka-table: the filter operator \'unknownOperator\' is not in predefinedFilterOperators, so the column \'name\' is not filtered. Available operators: =, !=, >, <, >=, <=, contains, IsEmpty, IsNotEmpty');
            warn.mockRestore();
        });

        it('custom column filter', () => {
            const columns = [{
                dataType: DataType.Number,
                filterRowValue: 45,
                key: 'score',
                filter: (value: unknown, filterValue: unknown) => value === filterValue,
            }];
            const result = filterData(data, columns);
            expect(result).toMatchSnapshot();
        });
    });

    [{
        falsy: [1, 2],
        name: '=',
        truthy: [1, 1],
    }, {
        falsy: [1, 1],
        name: '>',
        truthy: [2, 1],
    }, {
        falsy: [2, 1],
        name: '<',
        truthy: [1, 2],
    }, {
        falsy: [1, 2],
        name: '>=',
        truthy: [1, 1],
    }, {
        falsy: [2, 1],
        name: '<=',
        truthy: [1, 1],
    }, {
        falsy: ['abs', 'ss'],
        name: 'contains',
        truthy: ['hello', 'hell'],
    }, {
        falsy: [0, false],
        name: 'contains',
        truthy: [0, 0],
    }].forEach((d) => {
        it(`predefinedFilterOperators operator ${d.name} truthy: ${d.truthy} falsy: ${d.falsy}`, () => {
            const operator = predefinedFilterOperators.find((o) => o.name === d.name);
            if (!operator) {
                throw new Error(`${d.name} was not found`);
            }
            expect(operator.compare(d.truthy[0], d.truthy[1])).toBeTruthy();
            expect(operator.compare(d.falsy[0], d.falsy[1])).toBeFalsy();
        });
    });

    [{
        name: '=',
        nullShouldPass: false,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: '>',
        nullShouldPass: false,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: '<',
        nullShouldPass: true,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: '>=',
        nullShouldPass: false,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: '<=',
        nullShouldPass: true,
        undefinedShouldPass: false,
        value: 1,
    }, {
        name: 'contains',
        nullShouldPass: false,
        undefinedShouldPass: false,
        value: 1,
    }].forEach((d) => {
        it(`predefinedFilterOperators check null and undefined for ${d.name} operator`, () => {
            const operator = predefinedFilterOperators.find((o) => o.name === d.name);
            if (!operator) {
                throw new Error(`${d.name} was not found`);
            }
            expect(operator.compare(null, 1)).toEqual(d.nullShouldPass);
            expect(operator.compare(undefined, 1)).toEqual(d.undefinedShouldPass);
        });
    });

    describe('searchData', () => {
        const search: SearchFunc<{ passed: boolean }> = ({ searchText, rowData, column }) => {
            if (column.key === 'passed')
                return (searchText === 'false' && !rowData.passed) || (searchText === 'true' && rowData.passed);
        };
        const columns: Column[] = [
            { key: 'name', title: 'Name', dataType: DataType.String },
            { key: 'score', title: 'Score', dataType: DataType.Number },
            {
                dataType: DataType.Boolean,
                key: 'passed',
                title: 'Passed',
            },
        ];
        const data = [
            { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
            { id: 2, name: 'Billi Bob', score: 55, passed: false },
            { id: 3, name: 'Tom Williams', score: 45, passed: false },
            { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
            { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
            { id: 6, name: 'Sunny Fox', score: 33, passed: false },
            { id: 7, name: 'Falsey False', score: 33, passed: false },
        ];
        it('by string', () => {
            const result = searchData(columns, data, 'Mike', search);
            expect(result).toMatchSnapshot();
        });

        it('by boolean', () => {
            const columnsBoolean: Column[] = [
                {
                    dataType: DataType.Boolean,
                    key: 'passed',
                    title: 'Passed',
                },
            ];
            const result = searchData(columnsBoolean, data, 'tru');
            expect(result).toMatchSnapshot();
        });

        it('should add item only once', () => {
            const result = searchData(columns, data, 'false', search);
            expect(result).toMatchSnapshot();
        });

        it('should not find value by search handler', () => {
            const result = searchData(columns, data, 'tru', search);
            expect(result).toMatchSnapshot();
        });

        it('should find value by search handler', () => {
            const result = searchData(columns, data, 'true', search);
            expect(result).toMatchSnapshot();
        });
    });

    describe('searchData finds the shown text', () => {
        const columns: Column[] = [
            { key: 'date', dataType: DataType.Date },
            { key: 'price', dataType: DataType.Number },
            { key: 'link' },
            { key: 'secret', visible: false },
        ];
        const data = [{ id: 1, date: new Date(2021, 10, 8), price: 1000, link: 'docs', secret: 'hidden' }];
        const format: FormatFunc = ({ column, value }) => {
            if (column.key === 'date') {
                return (value as Date).toLocaleDateString('en-US');
            }
            if (column.key === 'price') {
                return `$${(value as number).toFixed(2)}`;
            }
            if (column.key === 'link') {
                // a value which is not a text
                return createElement('a', { href: String(value) });
            }
        };
        it.each([
            ['11/8/2021', 1],
            ['GMT', 0],
            ['$1000.00', 1],
            ['docs', 1],
            ['hidden', 0],
        ])('%s', (searchText, count) => {
            expect(searchData(columns, data, searchText, undefined, format)).toHaveLength(count);
        });
        it('searches the hidden columns only by the search function', () => {
            const search: SearchFunc<{ secret: string }> = ({ column, rowData, searchText }) => (column.key === 'secret' ? rowData.secret === searchText : undefined);
            expect(searchData(columns, data, 'hidden', search, format)).toHaveLength(1);
            expect(searchData(columns, data, 'hid', search, format)).toHaveLength(0);
        });
        it('searches the value when format returns false (e.g. of condition && text)', () => {
            expect(searchData(columns, data, '1000', undefined, ({ column, value }) => column.key === 'date' && (value as Date).toLocaleDateString('en-US'))).toHaveLength(1);
            expect(searchData(columns, data, 'false', undefined, () => false)).toHaveLength(0);
        });
    });

    describe('the filters', () => {
        it('isFilteredByFilterRow', () => {
            expect(isFilteredByFilterRow({ key: 'a' })).toBe(false);
            expect(isFilteredByFilterRow({ key: 'a', filterRowValue: '' })).toBe(false);
            expect(isFilteredByFilterRow({ key: 'a', filterRowValue: 0 })).toBe(true);
            expect(isFilteredByFilterRow({ key: 'a', filterRowOperator: FilterOperatorName.IsEmpty })).toBe(true);
            expect(isFilteredByFilterRow({ key: 'a', filterRowOperator: FilterOperatorName.IsNotEmpty })).toBe(true);
        });
        it('a date without time is the local date', () => {
            const columns: Column[] = [{ key: 'date', dataType: DataType.Date, filterRowValue: new Date(2021, 10, 8) }];
            expect(filterData([{ id: 1, date: '2021-11-08' }, { id: 2, date: '2021-11-09' }], columns).map((d) => d.id)).toEqual([1]);
        });
        it('the header filter uses an empty text of format', () => {
            const columns: Column[] = [{ key: 'score', headerFilterValues: [''] }];
            const data = [{ id: 1, score: -1 }, { id: 2, score: 2 }];
            const format: FormatFunc<typeof data[number]> = ({ value }) => ((value as number) > 0 ? String(value) : '');
            expect(filterByHeaderFilter(data, columns, format).map((d) => d.id)).toEqual([1]);
        });
    });
});
