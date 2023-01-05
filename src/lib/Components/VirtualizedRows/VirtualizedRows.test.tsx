import { EditingMode } from '../../enums';
import { ITableBodyProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';
import VirtualizedRows from './VirtualizedRows';

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
    ReactDOM.render(<VirtualizedRows {...tableProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Should call dispatch when virtualScrolling.itemHeight is not set', (done) => {
    const div = document.createElement('tbody');
    ReactDOM.render(
        <VirtualizedRows
            {...tableProps}
            virtualScrolling={{ tbodyHeight: 1 }}
        />,
        div,
        () => {
            setTimeout(() => {
                expect(tableProps.dispatch).toHaveBeenCalledTimes(1);
                done();
            }, 10);
        }
    );
});
