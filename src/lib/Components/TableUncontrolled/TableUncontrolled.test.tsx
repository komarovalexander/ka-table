import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import React from 'react';
import { TableUncontrolled } from './TableUncontrolled';
import { act } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { useTable } from '../../hooks/UseTable';

Enzyme.configure({ adapter: new Adapter() });
jest.useFakeTimers();

const props: any = {
    columns: [
        { key: 'column', name: 'Column 1' },
        { key: 'column2', name: 'Column 2' },
    ],
    data: [
        { column: 1, column2: 2, id: 1 },
        { column: 12, column2: 22, id: 2 },
    ],
    dispatch: jest.fn(),
    rowKeyField: 'id',
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    act(() => {
        root.render(<TableUncontrolled {...props} />);
    });
    act(() => {
        root.unmount();
    });
});

const tableDispatchMock = jest.fn();
const TableControlledWrapper = (wrapperProps: any) => {
    const table = useTable(({ onDispatch: tableDispatchMock }));
    return <TableUncontrolled table={table} {...wrapperProps} />
}

it('renders with table', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);

    act(() => {
        root.render(<TableControlledWrapper {...props} childComponents={{}}/>);
    });
    jest.runAllTimers();
    expect(tableDispatchMock.mock.calls).toHaveLength(1);
    expect(tableDispatchMock.mock.calls[0][1]).not.toHaveProperty('childComponents');

    act(() => {
        root.unmount();
    });
});
