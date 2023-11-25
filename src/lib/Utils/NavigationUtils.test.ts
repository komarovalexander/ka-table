import { ITableProps } from '../';
import { Cell } from '../Models/Cell';
import { getDownCell, getLeftCell, getRightCell, getUpCell } from './NavigationUtils';

describe('NavigationUtils', () => {
    const props: ITableProps = {
        rowKeyField: 'id',
        columns: [{ key: 'column1' }, { key: 'column2' }, { key: 'column3' }],
        data: [
            { id: 1, column1: 11, column2: 21, column3: 31 },
            { id: 2, column1: 12, column2: 22, column3: 32 },
            { id: 3, column1: 13, column2: 23, column3: 33 },
            { id: 4, column1: 14, column2: 24, column3: 34 },
            { id: 5, column1: 15, column2: 25, column3: 35 }
        ]
    };
    describe('getRightCell', () => {
        it('move one cell rigth', () => {
            const cell: Cell = { columnKey: 'column1', rowKeyValue: 3 }
            const result = getRightCell(cell, props);
            expect(result).toEqual({ columnKey: 'column2', rowKeyValue: 3 });
        });
        it('move to the rigth end', () => {
            const cell: Cell = { columnKey: 'column1', rowKeyValue: 3 }
            const result = getRightCell(cell, props, { end: true });
            expect(result).toEqual({ columnKey: 'column3', rowKeyValue: 3 });
        });
        it('don\'t move to the rigth in case it is the last column', () => {
            const cell: Cell = { columnKey: 'column3', rowKeyValue: 3 }
            const result = getRightCell(cell, props);
            expect(result).toEqual({ columnKey: 'column3', rowKeyValue: 3 });
        });
    });
    describe('getLeftCell', () => {
        it('move one cell left', () => {
            const cell: Cell = { columnKey: 'column3', rowKeyValue: 3 }
            const result = getLeftCell(cell, props);
            expect(result).toEqual({ columnKey: 'column2', rowKeyValue: 3 });
        });
        it('move to the left end', () => {
            const cell: Cell = { columnKey: 'column3', rowKeyValue: 3 }
            const result = getLeftCell(cell, props, { end: true });
            expect(result).toEqual({ columnKey: 'column1', rowKeyValue: 3 });
        });
        it('don\'t move to the left in case it is the last column', () => {
            const cell: Cell = { columnKey: 'column1', rowKeyValue: 3 }
            const result = getLeftCell(cell, props);
            expect(result).toEqual({ columnKey: 'column1', rowKeyValue: 3 });
        });
    });
    describe('getUpCell', () => {
        it('move one cell up', () => {
            const cell: Cell = { columnKey: 'column2', rowKeyValue: 3 }
            const result = getUpCell(cell, props);
            expect(result).toEqual({ columnKey: 'column2', rowKeyValue: 2 });
        });
        it('move to the up end', () => {
            const cell: Cell = { columnKey: 'column2', rowKeyValue: 3 }
            const result = getUpCell(cell, props, { end: true });
            expect(result).toEqual({ columnKey: 'column2', rowKeyValue: 1 });
        });
        it('don\'t move to the up in case it is the last row', () => {
            const cell: Cell = { columnKey: 'column2', rowKeyValue: 1 }
            const result = getUpCell(cell, props);
            expect(result).toEqual({ columnKey: 'column2', rowKeyValue: 1 });
        });
    });
    describe('getDownCell', () => {
        it('move one cell down', () => {
            const cell: Cell = { columnKey: 'column2', rowKeyValue: 3 }
            const result = getDownCell(cell, props);
            expect(result).toEqual({ columnKey: 'column2', rowKeyValue: 4 });
        });
        it('move to the up down', () => {
            const cell: Cell = { columnKey: 'column2', rowKeyValue: 3 }
            const result = getDownCell(cell, props, { end: true });
            expect(result).toEqual({ columnKey: 'column2', rowKeyValue: 5 });
        });
        it('don\'t move to the down in case it is the last row', () => {
            const cell: Cell = { columnKey: 'column2', rowKeyValue: 5 }
            const result = getDownCell(cell, props);
            expect(result).toEqual({ columnKey: 'column2', rowKeyValue: 5 });
        });
    });
});
