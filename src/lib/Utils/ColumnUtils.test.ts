import {
    areColumnsSameForRows, getColumn, getColumnsWithFixedStyle, getField, getFieldParts, getFixedColumnClassName, getLastField, getLastFieldParents,
} from './ColumnUtils';

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

    describe('the fixed columns (#495)', () => {
        it('getColumnsWithFixedStyle: the offsets are the widths of the fixed columns between the column and its edge', () => {
            const columns = getColumnsWithFixedStyle([
                { key: 'a', width: 100, fixed: 'left' },
                { key: 'b', width: 50, fixed: 'left', style: { color: 'red' } },
                { key: 'c', width: 200 },
                { key: 'd', width: 80, fixed: 'right' },
                { key: 'e', width: 60, fixed: 'right' },
            ]);
            expect(columns.map((column) => column.style)).toEqual([{ left: 0 }, { left: 100, color: 'red' }, undefined, { right: 60 }, { right: 0 }]);
        });
        it('getColumnsWithFixedStyle keeps the offset of the style and the columns without fixed ones', () => {
            const columns = [{ key: 'a', width: 100 }, { key: 'b' }];
            expect(getColumnsWithFixedStyle(columns)).toBe(columns);
            expect(getColumnsWithFixedStyle([{ key: 'a', fixed: 'left', style: { left: 40 } }])[0].style).toEqual({ left: 40 });
        });
        it('getFixedColumnClassName', () => {
            expect(getFixedColumnClassName({ key: 'a', fixed: 'left' })).toBe(' ka-fixed-left');
            expect(getFixedColumnClassName({ key: 'a', fixed: 'right' })).toBe(' ka-fixed-right');
            expect(getFixedColumnClassName({ key: 'a' })).toBe('');
        });
        it('getFixedColumnClassName: the fixed columns next to the scrolled ones show the shadow', () => {
            const columns = getColumnsWithFixedStyle([
                { key: 'a', fixed: 'left' }, { key: 'b', fixed: 'left' }, { key: 'c' }, { key: 'd', fixed: 'right' }, { key: 'e', fixed: 'right' },
            ]);
            expect(columns.map(getFixedColumnClassName)).toEqual([
                ' ka-fixed-left', ' ka-fixed-left ka-fixed-left-last', '', ' ka-fixed-right ka-fixed-right-first', ' ka-fixed-right',
            ]);
        });
    });
});
