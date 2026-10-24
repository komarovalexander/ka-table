import * as React from 'react';

import { ChildComponents, Column } from '../../models';
import { ITableInstance, Table, useTable } from '../..';
import { act, render } from '@testing-library/react';

import { FormatFunc } from '../../types';

// the types are checked by tsc (yarn typecheck), the tests render the same tables
interface Row {
    id: number;
    name: string;
}
interface Order {
    orderId: number;
}

const data: Row[] = [{ id: 1, name: 'tom' }, { id: 2, name: 'kitty' }];
const getCellTexts = (container: HTMLElement) => Array.from(container.querySelectorAll('tbody td')).map((cell) => cell.textContent);

describe('the type of the rows', () => {
    it('is inferred from data', () => {
        const { container } = render(
            <Table
                columns={[{ key: 'name', title: 'Name' }]}
                data={data}
                rowKeyField='id'
                format={({ rowData }) => {
                    expectTypeOf(rowData).toEqualTypeOf<Row | undefined>();
                    return rowData?.name.toUpperCase();
                }}
            />
        );
        expect(getCellTexts(container)).toEqual(['TOM', 'KITTY']);
    });

    it('is inferred from data with the instance of useTable() without the type of the rows', () => {
        const App = () => {
            const table = useTable();
            return (
                <Table
                    table={table}
                    columns={[{ key: 'name', title: 'Name' }]}
                    data={data}
                    rowKeyField='id'
                    format={({ rowData }) => {
                        expectTypeOf(rowData).toEqualTypeOf<Row | undefined>();
                        return rowData?.name.toUpperCase();
                    }}
                />
            );
        };
        const { container } = render(<App />);
        expect(getCellTexts(container)).toEqual(['TOM', 'KITTY']);
    });

    it('is inferred from the instance of useTable<TData>() without data', () => {
        let table: ITableInstance<Row>;
        const App = () => {
            table = useTable<Row>();
            return (
                <Table
                    table={table}
                    columns={[{ key: 'name', title: 'Name' }]}
                    rowKeyField='id'
                    format={({ rowData }) => {
                        expectTypeOf(rowData).toEqualTypeOf<Row | undefined>();
                        return rowData?.name.toUpperCase();
                    }}
                />
            );
        };
        const { container } = render(<App />);
        act(() => table!.updateData(data));
        expect(getCellTexts(container)).toEqual(['TOM', 'KITTY']);
        expectTypeOf(table!.props.data).toEqualTypeOf<Row[] | undefined>();
    });

    it('is kept by the columns, the customizations and the functions declared without the type of the rows', () => {
        const columns: Column[] = [{ key: 'name', title: 'Name' }];
        const childComponents: ChildComponents = { cellText: { elementAttributes: () => ({ className: 'name-text' }) } };
        const format: FormatFunc = ({ value }) => String(value).toUpperCase();
        const { container } = render(
            <Table
                columns={columns}
                childComponents={childComponents}
                format={format}
                data={data}
                rowKeyField='id'
                searchText='o'
                search={({ searchText, rowData }) => {
                    expectTypeOf(rowData).toEqualTypeOf<Row>();
                    return rowData.name.includes(searchText);
                }}
            />
        );
        expect(getCellTexts(container)).toEqual(['TOM']);
        expect(container.querySelectorAll('.name-text').length).toBe(1);
    });

    it('of the instance has to be the type of data', () => {
        const App = () => {
            const table = useTable<Order>();
            // @ts-expect-error the rows of data are not the rows of the instance
            return <Table table={table} columns={[{ key: 'name', title: 'Name' }]} data={data} rowKeyField='id' />;
        };
        const { container } = render(<App />);
        expect(getCellTexts(container)).toEqual(['tom', 'kitty']);
    });
});
