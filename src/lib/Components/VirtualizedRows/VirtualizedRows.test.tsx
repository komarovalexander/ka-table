import { EditingMode } from '../../enums';
import { ITableBodyProps } from '../../props';
import React from 'react';
import VirtualizedRows from './VirtualizedRows';
import { act } from "@testing-library/react";
import { createRoot } from 'react-dom/client';

const tableProps: ITableBodyProps = {
    childComponents: {},
    columns: [
        { key: 'column', title: 'Column 1' },
        { key: 'column2', title: 'Column 2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: jest.fn(),
    editableCells: [],
    editingMode: EditingMode.None,
    groupColumnsCount: 0,
    groupedColumns: [],
    rowKeyField: 'id',
    selectedRows: [],
} as any;

beforeEach(() => jest.clearAllMocks());

it('renders without crashing', () => {
    const div = document.createElement('tbody');
    const root = createRoot(div!);
    act(() => {
      root.render(<VirtualizedRows {...tableProps} />);
    });
    act(() => {
      root.unmount();
    });
});

it('Should call dispatch when virtualScrolling.itemHeight is not set', () => {
    const div = document.createElement('tbody');
    const root = createRoot(div!);
    act(() => {
      root.render(<VirtualizedRows {...tableProps} virtualScrolling={{ tbodyHeight: 1 }} />);
    });
    expect(tableProps.dispatch).toHaveBeenCalledTimes(1);
    act(() => {
      root.unmount();
    });
});