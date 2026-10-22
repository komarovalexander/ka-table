import * as React from 'react';

import { IKaTableProps, ITableInstance, Table } from '../..';
import { fireEvent, render, within } from '@testing-library/react';

import { useTable } from '../../hooks/UseTable';

const columns = [{ key: 'name', title: 'Name' }, { key: 'city', title: 'City' }];
const createProps = (prefix: string, firstId: number): IKaTableProps => ({
    columns,
    data: [0, 1, 2].map((index) => ({ id: firstId + index, name: `${prefix} name ${index}`, city: `${prefix} city ${index}` })),
    rowKeyField: 'id',
    rowReordering: true,
    columnReordering: true,
    groupPanel: { enabled: true, text: 'Drop a column here' },
});
// two tables on the page with different keys of the rows
const tablesProps = [createProps('first', 0), createProps('second', 10)];

// the data of the drag is kept between its events, as in a browser
const createDataTransfer = (types: string[] = []) => {
    const data: Record<string, string> = {};
    types.forEach((type) => { data[type] = ''; });
    return {
        dropEffect: 'none',
        effectAllowed: 'all',
        setData: (type: string, value: string) => { data[type.toLowerCase()] = value; },
        getData: (type: string) => data[type.toLowerCase()] || '',
        get types() { return Object.keys(data); },
    };
};

/**
 * Drags the item to the target and drops it there. The drop event is fired even if the target doesn't allow it:
 * a browser doesn't fire it then, the handlers have to ignore it anyway.
 * Returns whether the target allows the drop (cancels dragover) and is highlighted.
 */
const drag = (item: Element, target: Element) => {
    const dataTransfer = createDataTransfer();
    fireEvent.dragStart(item, { dataTransfer });
    fireEvent.dragEnter(target, { dataTransfer });
    const isDropAllowed = !fireEvent.dragOver(target, { dataTransfer });
    const isHighlighted = /ka-drag-over/.test(target.className);
    fireEvent.drop(target, { dataTransfer });
    fireEvent.dragEnd(item, { dataTransfer });
    return { isDropAllowed, isHighlighted };
};

const setup = () => {
    const tables: ITableInstance[] = [];
    const TableWithInstance = ({ index }: { index: number }) => {
        const table = useTable();
        tables[index] = table;
        return <Table table={table} {...tablesProps[index]} />;
    };
    const { container } = render(<><TableWithInstance index={0} /><TableWithInstance index={1} /></>);
    const elements = Array.from(container.querySelectorAll<HTMLElement>('.ka')).map((element, index) => ({
        row: (text: string) => within(element).getByText(text).closest('tr')!,
        headCell: (text: string) => within(element).getByText(text).closest('th')!,
        groupPanel: () => element.querySelector('.ka-group-panel')!,
        rowsText: () => Array.from(element.querySelectorAll('tbody tr.ka-row')).map((row) => row.firstElementChild!.textContent),
        rowKeys: () => tables[index].props.data!.map((row) => row.id),
        columnKeys: () => tables[index].props.columns.map((column) => column.key),
        groups: () => tables[index].props.groups,
    }));
    return { first: elements[0], second: elements[1] };
};

describe('drag and drop', () => {
    it('moves the rows and the columns', () => {
        const { first } = setup();
        expect(drag(first.row('first name 0'), first.row('first name 2'))).toEqual({ isDropAllowed: true, isHighlighted: true });
        expect(first.rowKeys()).toEqual([1, 2, 0]);
        expect(first.rowsText()).toEqual(['first name 1', 'first name 2', 'first name 0']);

        expect(drag(first.headCell('City'), first.headCell('Name'))).toEqual({ isDropAllowed: true, isHighlighted: true });
        expect(first.columnKeys()).toEqual(['city', 'name']);
    });
    it('groups the column dropped on the group panel', () => {
        const { first } = setup();
        expect(drag(first.headCell('City'), first.groupPanel()).isDropAllowed).toBe(true);
        expect(first.groups()).toEqual([{ columnKey: 'city' }]);
        // the panel is full: the table has one column which is not grouped
        expect(drag(first.headCell('Name'), first.groupPanel()).isDropAllowed).toBe(false);
        expect(first.groups()).toEqual([{ columnKey: 'city' }]);
    });
    it('does not drop a row on a header cell or on the group panel', () => {
        const { first } = setup();
        expect(drag(first.row('first name 0'), first.headCell('Name'))).toEqual({ isDropAllowed: false, isHighlighted: false });
        expect(drag(first.row('first name 0'), first.groupPanel()).isDropAllowed).toBe(false);
        expect(first.columnKeys()).toEqual(['name', 'city']);
        expect(first.groups()).toBeUndefined();
        expect(first.rowsText()).toEqual(['first name 0', 'first name 1', 'first name 2']);
    });
    it('does not drop a column on a row', () => {
        const { first } = setup();
        expect(drag(first.headCell('Name'), first.row('first name 2'))).toEqual({ isDropAllowed: false, isHighlighted: false });
        expect(first.rowKeys()).toEqual([0, 1, 2]);
        expect(first.columnKeys()).toEqual(['name', 'city']);
    });
    it('does not move the rows and the columns to another table', () => {
        const { first, second } = setup();
        expect(drag(first.row('first name 0'), second.row('second name 2'))).toEqual({ isDropAllowed: false, isHighlighted: false });
        expect(drag(first.headCell('City'), second.headCell('Name'))).toEqual({ isDropAllowed: false, isHighlighted: false });
        expect(drag(first.headCell('City'), second.groupPanel()).isDropAllowed).toBe(false);
        expect(second.rowKeys()).toEqual([10, 11, 12]);
        expect(second.rowsText()).toEqual(['second name 0', 'second name 1', 'second name 2']);
        expect(second.columnKeys()).toEqual(['name', 'city']);
        expect(second.groups()).toBeUndefined();
        expect(first.rowKeys()).toEqual([0, 1, 2]);
        expect(first.columnKeys()).toEqual(['name', 'city']);
    });
    it('does not drop a file or a text dragged from outside of the table', () => {
        const { first } = setup();
        // the drag of the table ends before the file is dragged
        drag(first.row('first name 0'), first.row('first name 1'));
        const target = first.row('first name 2');
        const dataTransfer = createDataTransfer(['Files']);
        fireEvent.dragEnter(target, { dataTransfer });
        expect(fireEvent.dragOver(target, { dataTransfer })).toBe(true);
        fireEvent.drop(target, { dataTransfer });
        expect(first.rowKeys()).toEqual([1, 0, 2]);
    });
    it('removes the highlight when the item leaves the target or is dropped', () => {
        const { first } = setup();
        const item = first.row('first name 0');
        const target = first.row('first name 2');
        const dataTransfer = createDataTransfer();
        fireEvent.dragStart(item, { dataTransfer });
        expect(item.classList.contains('ka-dragged-row')).toBe(true);
        fireEvent.dragEnter(target, { dataTransfer });
        expect(target.classList.contains('ka-drag-over-row')).toBe(true);
        fireEvent.dragLeave(target, { dataTransfer });
        expect(target.classList.contains('ka-drag-over-row')).toBe(false);
        fireEvent.dragEnter(target, { dataTransfer });
        fireEvent.drop(target, { dataTransfer });
        fireEvent.dragEnd(item, { dataTransfer });
        expect(target.classList.contains('ka-drag-over-row')).toBe(false);
        expect(item.classList.contains('ka-dragged-row')).toBe(false);
    });
});
