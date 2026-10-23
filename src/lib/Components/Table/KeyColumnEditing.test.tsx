import * as React from 'react';

import { ITableInstance, Table } from '../..';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { EditingMode } from '../../enums';
import { useTable } from '../../hooks/UseTable';

describe('editing of the key column', () => {
    it('the cell editor changes the key of the row', () => {
        let table: ITableInstance;
        const App = () => {
            table = useTable();
            return (
                <Table
                    table={table}
                    columns={[{ key: 'id', title: 'Id' }, { key: 'name', title: 'Name' }]}
                    data={[{ id: 1, name: 'a' }, { id: 2, name: 'b' }]}
                    editingMode={EditingMode.Cell}
                    rowKeyField='id'
                    selectedRows={[1]}
                />
            );
        };
        const { container } = render(<App />);
        act(() => table!.openEditor(1, 'id'));
        const input = container.querySelector<HTMLInputElement>('.ka-cell-editor input')!;
        fireEvent.change(input, { target: { value: '10' } });
        fireEvent.blur(input);
        expect(table!.props.data).toEqual([{ id: '10', name: 'a' }, { id: 2, name: 'b' }]);
        expect(table!.props.selectedRows).toEqual(['10']);
        expect(table!.props.editableCells).toEqual([]);
        expect(Array.from(container.querySelectorAll('tbody tr.ka-row')).map((row) => row.textContent)).toEqual(['10a', '2b']);
    });

    it('the focus stays in the cell after its row gets the new key', async () => {
        render(
            <Table
                columns={[{ key: 'id', title: 'Id' }, { key: 'name', title: 'Name' }]}
                data={[{ id: 1, name: 'a' }, { id: 2, name: 'b' }]}
                editingMode={EditingMode.Cell}
                rowKeyField='id'
            />
        );
        act(() => screen.getByText('1').closest('td')!.focus());
        fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
        fireEvent.keyUp(document.activeElement!, { key: 'Enter' });
        const input = document.activeElement as HTMLInputElement;
        expect(input.tagName).toBe('INPUT');
        fireEvent.change(input, { target: { value: '10' } });
        fireEvent.keyUp(input, { key: 'Enter', keyCode: 13 });
        await act(async () => {});
        expect(document.activeElement).toBe(screen.getByText('10').closest('td'));
    });
});
