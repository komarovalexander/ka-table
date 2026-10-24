import * as React from 'react';

import { EditingMode } from '../../enums';
import { IKaTableProps, ITableInstance, Table } from '../..';
import { act, fireEvent, render, within } from '@testing-library/react';

import { useTable } from '../../hooks/UseTable';

const columns = [{ key: 'name', title: 'Name' }, { key: 'city', title: 'City' }];
const createData = (prefix: string) => [0, 1].map((id) => ({ id, name: `${prefix} name ${id}`, city: `${prefix} city ${id}` }));
type Row = ReturnType<typeof createData>[number];

const keyUp = (element: Element | Window, key: 'Enter' | 'Escape') => fireEvent.keyUp(element, { key, keyCode: key === 'Enter' ? 13 : 27 });

// a search input and two tables on the page
const setup = (tableProps: Partial<IKaTableProps<Row>> = {}) => {
    const tables: ITableInstance<Row>[] = [];
    const TableWithInstance = ({ index }: { index: number }) => {
        const table = useTable<Row>();
        tables[index] = table;
        return <Table table={table} columns={columns} data={createData(`table${index}`)} rowKeyField='id' {...tableProps} />;
    };
    const { container } = render(
        <>
            <input className='search' />
            <TableWithInstance index={0} />
            <TableWithInstance index={1} />
        </>
    );
    const tableElements = Array.from(container.querySelectorAll<HTMLElement>('.ka'));
    const getEditors = (index: number) => Array.from(tableElements[index].querySelectorAll<HTMLInputElement>('.ka-cell-editor input'));
    const getEditorRows = (index: number) => getEditors(index).map((editor) => editor.closest('tr')!.rowIndex);
    return {
        getEditorRows,
        getEditors,
        search: container.querySelector('.search')!,
        table: (index: number) => tables[index],
        tableElement: (index: number) => within(tableElements[index]),
    };
};

describe('the keys of the editors', () => {
    it('Esc and Enter outside of the row of the editor do not close it', () => {
        const { getEditors, search, table, tableElement } = setup({ editingMode: EditingMode.Cell });
        act(() => table(0).openEditor(0, 'name'));
        expect(getEditors(0).length).toBe(1);

        keyUp(search, 'Escape');
        keyUp(search, 'Enter');
        keyUp(document.body, 'Escape');
        keyUp(window, 'Enter');
        // another row of the table and another table
        keyUp(tableElement(0).getByText('table0 city 1'), 'Escape');
        keyUp(tableElement(1).getByText('table1 name 0'), 'Escape');
        expect(getEditors(0).length).toBe(1);

        const editor = getEditors(0)[0];
        fireEvent.change(editor, { target: { value: 'changed' } });
        keyUp(editor, 'Enter');
        expect(getEditors(0).length).toBe(0);
        expect(table(0).props.data![0].name).toBe('changed');
    });
    it('Esc closes the editors of its row', () => {
        const { getEditorRows, getEditors, table } = setup({
            editableCells: [0, 1].flatMap((rowKeyValue) => columns.map((column) => ({ columnKey: column.key, rowKeyValue }))),
        });
        // the row of the head and the rows of the data
        expect(getEditorRows(0)).toEqual([1, 1, 2, 2]);
        keyUp(getEditors(0)[3], 'Escape');
        expect(getEditorRows(0)).toEqual([1, 1]);
        expect(getEditorRows(1)).toEqual([1, 1, 2, 2]);
        expect(table(0).props.editableCells).toEqual([{ columnKey: 'name', rowKeyValue: 0 }, { columnKey: 'city', rowKeyValue: 0 }]);
    });
});
