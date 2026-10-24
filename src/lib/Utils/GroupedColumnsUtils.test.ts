import { GroupedColumnResult, addColumnToRows, getChain, getRowsWithGroupedColumns } from './GroupedColumnsUtils';

import { Column } from '../models';
import { GroupedColumn } from '../Models/GroupedColumn';

describe('getChain', () => {
    it('default', () => {
        const column: Column = { key: '1' };
        const groupedColumns: GroupedColumn[] = [];
        const currentChain: (Column | GroupedColumn)[] = [];
        const result = getChain(column, groupedColumns, currentChain);
        expect(result).toEqual([column]);
    });
    it('group 1 column', () => {
        const column: Column = { key: '1' };
        const groupedColumns: GroupedColumn[] = [{ key: 'group1', columnsKeys: ['1'] }];
        const currentChain: (Column | GroupedColumn)[] = [];
        const result = getChain(column, groupedColumns, currentChain);
        expect(result).toMatchSnapshot();
    });
});
describe('addColumnToRows', () => {
    it('default', () => {
        const rows: GroupedColumnResult[][] = [];
        const column: Column = { key: '1'};
        const groupedColumns: GroupedColumn[] = [];
        const result = addColumnToRows(rows, column, groupedColumns);
        expect(result).toMatchSnapshot();
    });
    it('group 1 column', () => {
        const rows: GroupedColumnResult[][] = [];
        const column: Column = { key: '1' };
        const groupedColumns: GroupedColumn[] = [{ key: 'group1', columnsKeys: ['1'] }];
        const result = addColumnToRows(rows, column, groupedColumns);
        expect(result).toMatchSnapshot();
    });
    it('group 1 column and 1 column', () => {
        const rows: GroupedColumnResult[][] = [];
        const column: Column = { key: '2' };
        const groupedColumns: GroupedColumn[] = [{ key: 'group1', columnsKeys: ['1'] }];
        const result = addColumnToRows(rows, column, groupedColumns);
        expect(result).toMatchSnapshot();
    });
});

describe('getRowsWithGroupedColumns', () => {
    it('default', () => {
        const columns: Column[] = [{ key: '1'}];
        const groupedColumns: GroupedColumn[] = [];
        const result = getRowsWithGroupedColumns(columns, groupedColumns);
        expect(result).toMatchSnapshot();
    });
    it('group 1 column', () => {
        const columns: Column[] = [{ key: '1'}];
        const groupedColumns: GroupedColumn[] = [{ key: 'group1', columnsKeys: ['1'] }];
        const result = getRowsWithGroupedColumns(columns, groupedColumns);
        expect(result).toMatchSnapshot();
    });
    it('group 1 column and 1 column', () => {
        const columns: Column[] = [{ key: '1'}, { key: '2' }];
        const groupedColumns: GroupedColumn[] = [{ key: 'group1', columnsKeys: ['1'] }];
        const result = getRowsWithGroupedColumns(columns, groupedColumns);
        expect(result).toMatchSnapshot();
    });
    it('group 2 columns in differnt places and 1 column between them', () => {
        const columns: Column[] = [{ key: '1'}, { key: '2' }, { key: '3' }];
        const groupedColumns: GroupedColumn[] = [{ key: 'group1', columnsKeys: ['1', '3'] }, { key: 'group2', columnsKeys: ['group1'] }];
        const result = getRowsWithGroupedColumns(columns, groupedColumns);
        expect(result).toMatchSnapshot();
    });
});
