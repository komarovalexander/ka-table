import { areColumnsSameForRows, getColumn, getField, getFieldParts, getLastField, getLastFieldParents } from './ColumnUtils';

import { SortDirection } from '../enums';
import defaultOptions from '../defaultOptions';

describe('ColumnUtils', () => {
    describe('getColumn', () => {
        it('default', () => {
            const result = getColumn(
                [
                    {
                        key: 'column1',
                    },
                    {
                        key: 'column2',
                    },
                    {
                        key: 'column3',
                    },
                ],
                'column3'
            );
            expect(result).toEqual({
                key: 'column3',
            });
        });
    });
    it('getField from field', () => {
        const field = getField({ key: '2.2', field: '2.3' });
        expect(field).toEqual('2.3');
    });
    it('getField from key', () => {
        const field = getField({ key: '2.2' });
        expect(field).toEqual('2.2');
    });
    it('getLastField', () => {
        const fields = getLastField('prop1.prop2.prop3');
        expect(fields).toEqual('prop3');
    });
    it('getLastFieldParents', () => {
        const fields = getLastFieldParents('prop1.prop2.prop3');
        expect(fields).toEqual(['prop1', 'prop2']);
    });
    it('getFieldParts', () => {
        const fields = getFieldParts('prop1.prop2.prop3');
        expect(fields).toEqual(['prop1', 'prop2', 'prop3']);
    });
    describe('ColumnUtils without delimiter', () => {
        beforeEach(() => {
            defaultOptions.fieldDelimiter = '';
        });
        afterEach(() => {
            defaultOptions.fieldDelimiter = '.';
        });

        it('getField from field', () => {
            const field = getField({ key: '2.2', field: '2.3' });
            expect(field).toEqual('2.3');
        });

        it('getField from key', () => {
            const field = getField({ key: '2.2' });
            expect(field).toEqual('2.2');
        });

        it('getLastField', () => {
            const fields = getLastField('prop1.prop2.prop3');
            expect(fields).toEqual('prop1.prop2.prop3');
        });

        it('getLastFieldParents', () => {
            const fields = getLastFieldParents('prop1.prop2.prop3');
            expect(fields).toEqual([]);
        });

        it('getFieldParts', () => {
            const fields = getFieldParts('prop1.prop2.prop3');
            expect(fields).toEqual(['prop1.prop2.prop3']);
        });
    });
    describe('areColumnsSameForRows', () => {
        const columns = [
            { key: 'a', width: 100, style: { width: 100, color: 'red' }, colGroup: { width: 100, style: { width: 100 } } },
            { key: 'b', sortDirection: SortDirection.Ascend },
        ];
        const withColumn = (column: object) => [{ ...columns[0], ...column }, columns[1]];
        it('ignores the header filter popup', () => {
            const changed = withColumn({ isHeaderFilterPopupShown: true, headerFilterPopupPosition: { x: 1, y: 2 }, headerFilterSearchValue: 'x' });
            expect(areColumnsSameForRows(columns, changed, false)).toBe(true);
        });
        it('ignores the widths with isWidthIgnored', () => {
            const changed = withColumn({ width: 150, style: { width: 150, color: 'red' }, colGroup: { width: 150, style: { width: 150 } } });
            expect(areColumnsSameForRows(columns, changed, true)).toBe(true);
            expect(areColumnsSameForRows(columns, changed, false)).toBe(false);
        });
        it('compares the other fields', () => {
            expect(areColumnsSameForRows(columns, withColumn({ style: { width: 100, color: 'blue' } }), true)).toBe(false);
            expect(areColumnsSameForRows(columns, withColumn({ title: 'A' }), true)).toBe(false);
            expect(areColumnsSameForRows(columns, withColumn({ headerFilterValues: ['x'] }), true)).toBe(false);
            expect(areColumnsSameForRows(columns, [columns[0], { ...columns[1], sortDirection: SortDirection.Descend }], true)).toBe(false);
            expect(areColumnsSameForRows(columns, [columns[1], columns[0]], true)).toBe(false);
            expect(areColumnsSameForRows(columns, [columns[0]], true)).toBe(false);
            expect(areColumnsSameForRows(columns, [...columns], false)).toBe(true);
        });
    });
});
