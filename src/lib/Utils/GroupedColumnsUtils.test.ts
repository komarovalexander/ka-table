import { addColumnToRows, getChain, getRowsWithGroupedColumns } from './GroupedColumnsUtils';

describe('getChain', () => {
  it('default', () => {
    const column: any = { key: '1' };
    const groupedColumns: any[] = [];
    const currentChain: any[] = [];
    const result = getChain(column, groupedColumns, currentChain);
    expect(result).toEqual([column]);
  });
  it('group 1 column', () => {
    const column: any = { key: '1' };
    const groupedColumns: any[] = [{ key: 'group1', columnsKeys: ['1'] }];
    const currentChain: any[] = [];
    const result = getChain(column, groupedColumns, currentChain);
    expect(result).toMatchSnapshot();
  });
});
describe('addColumnToRows', () => {
  it('default', () => {
    const rows: any = [];
    const column: any = { key: '1'};
    const groupedColumns: any[] = [];
    const result = addColumnToRows(rows, column, groupedColumns);
    expect(result).toMatchSnapshot();
  });
  it('group 1 column', () => {
    const rows: any = [];
    const column: any = { key: '1' };
    const groupedColumns: any[] = [{ key: 'group1', columnsKeys: ['1'] }];
    const result = addColumnToRows(rows, column, groupedColumns);
    expect(result).toMatchSnapshot();
  });
  it('group 1 column and 1 column', () => {
    const rows: any = [];
    const column: any = { key: '2' };
    const groupedColumns: any[] = [{ key: 'group1', columnsKeys: ['1'] }];
    const result = addColumnToRows(rows, column, groupedColumns);
    expect(result).toMatchSnapshot();
  });
});

describe('getRowsWithGroupedColumns', () => {
  it('default', () => {
    const columns: any[] = [{ key: '1'}];
    const groupedColumns: any[] = [];
    const result = getRowsWithGroupedColumns(columns, groupedColumns);
    expect(result).toMatchSnapshot();
  });
  it('group 1 column', () => {
    const columns: any[] = [{ key: '1'}];
    const groupedColumns: any[] = [{ key: 'group1', columnsKeys: ['1'] }];
    const result = getRowsWithGroupedColumns(columns, groupedColumns);
    expect(result).toMatchSnapshot();
  });
  it('group 1 column and 1 column', () => {
    const columns: any[] = [{ key: '1'}, { key: '2' }];
    const groupedColumns: any[] = [{ key: 'group1', columnsKeys: ['1'] }];
    const result = getRowsWithGroupedColumns(columns, groupedColumns);
    expect(result).toMatchSnapshot();
  });
});