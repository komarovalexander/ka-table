import { act } from '@testing-library/react';
import { EditingMode } from '../../enums';
import React from 'react';
import TableBody from './TableBody';
import { createRoot } from 'react-dom/client';
import { renderInto } from '../../../testUtils/renderInto';
import { ITableBodyProps } from '../../props';

const props: ITableBodyProps = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1' },
        { key: 'column2', title: 'Column 2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: vi.fn(),
    editableCells: [],
    editingMode: EditingMode.None,
    groupColumnsCount: 0,
    groupedColumns: [],
    rowKeyField: 'id',
    rowReordering: false,
    selectedRows: [],
};

afterEach(() => vi.clearAllMocks());

describe('TableBody', () => {
    it('renders without crashing', () => {
        const element = document.createElement('table');
        const root = createRoot(element!);
        act(() => {
            root.render(<TableBody {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });
    it('add custom className', () => {
        const { container } = renderInto('table', (
            <TableBody {...props} childComponents={{
                tableBody: {
                    elementAttributes: () => ({
                        className: 'customClass'
                    })
                }
            }} />
        ));

        const tbody = container.querySelector('tbody')!;
        expect(tbody.classList.contains('customClass')).toBeTruthy();
        expect(tbody.classList.contains('ka-tbody')).toBeTruthy();
    });
});
