import { ActionType, DataType, EditingMode } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import FilterRowBoolean from './FilterRowBoolean';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

let props: ICellEditorProps;

beforeEach(() => {
    props = {
        column: {
            dataType: DataType.Boolean,
            key: 'fieldName',
            title: 'Field',
        },
        dispatch: vi.fn(),
        editingMode: EditingMode.None,
        field: 'fieldName',
        isDetailsRowShown: false,
        isSelectedRow: true,
        rowData: { column: 1 },
        rowKeyField: '',
        rowKeyValue: undefined,
        selectedRows: [],
        value: undefined,
    };
});

describe('FilterRowBoolean', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        act(() => {
            root.render(<FilterRowBoolean {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should fire FilterRowChanged', () => {
        const column = {
            field: 'name',
            key: 'nameKey',
            dataType: DataType.Boolean,
        };
        const { container } = render(<FilterRowBoolean {...props} column={column} />);

        // the filter value is not specified, so a click checks the checkbox
        fireEvent.click(container.querySelector('input')!);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: column.key,
            filterRowValue: true,
            type: ActionType.UpdateFilterRowValue,
        });
    });

    it('should set as unspecified after unchecked', () => {
        const column = {
            field: 'name',
            key: 'nameKey',
            dataType: DataType.Boolean,
            filterRowValue: false,
        };
        const { container } = render(<FilterRowBoolean {...props} column={column} />);

        // the filter value is false, so the checkbox is unchecked and a click checks it
        fireEvent.click(container.querySelector('input')!);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            type: ActionType.UpdateFilterRowValue,
            filterRowValue: undefined,
            columnKey: column.key,
        });
    });
});
