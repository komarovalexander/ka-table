import { ActionType, DataType } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import CellEditorDate from './CellEditorDate';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: ICellEditorProps = {
    column: {
        dataType: DataType.Date,
        key: 'fieldName',
        title: 'Field',
    },
    dispatch: vi.fn(),
    field: 'fieldName',
    isSelectedRow: true,
    rowData: { fieldName: new Date(2020, 0, 2), id: 2 },
    rowKeyField: 'id',
    rowKeyValue: 2,
} as any;

beforeEach(() => {
    vi.clearAllMocks();
});

describe('CellEditorDate', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        act(() => {
            root.render(<CellEditorDate {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should fire RowDataChanged', () => {
        const { container } = render(<CellEditorDate {...props} />);

        fireEvent.change(container.querySelector('input')!, { target: { value: '2020-02-02' } });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'fieldName',
            rowKeyValue: 2,
            type: ActionType.UpdateCellValue,
            value: new Date(2020, 1, 2), // the date from the input is converted to the local date https://github.com/komarovalexander/ka-table/issues/279
        });
    });

    it('edits a date of a JSON (a string)', () => {
        const { container } = render(<CellEditorDate {...props} value='2020-01-02' />);
        const input = container.querySelector('input')!;
        expect(input.value).toBe('2020-01-02');

        fireEvent.change(input, { target: { value: '2020-02-02' } });
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'fieldName',
            rowKeyValue: 2,
            type: ActionType.UpdateCellValue,
            value: '2020-02-02',
        });
    });

    it('should dispatch CloseEditor', () => {
        const { container } = render(<CellEditorDate {...props} />);

        fireEvent.blur(container.querySelector('input')!);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            type: ActionType.CloseEditor,
            columnKey: 'fieldName',
            rowKeyValue: 2,
        });
    });
});
