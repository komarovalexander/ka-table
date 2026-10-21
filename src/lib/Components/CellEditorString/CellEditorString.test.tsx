import { ActionType, DataType } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import CellEditorString from './CellEditorString';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

let props: ICellEditorProps;

beforeEach(() => {
    props = {
        column: {
            dataType: DataType.String,
            key: 'fieldName',
            title: 'Field',
        },
        dispatch: vi.fn(),
        field: 'fieldName',
        isSelectedRow: true,
        rowData: { fieldName: 'fieldNameText', id: 1 },
        rowKeyField: 'id',
        rowKeyValue: 1,
    } as any;
});

describe('CellEditorString', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        act(() => {
            root.render(<CellEditorString {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should fire RowDataChanged', () => {
        const newValue = 'fieldNameUpdatedText';
        const { container } = render(<CellEditorString {...props} />);

        fireEvent.change(container.querySelector('input')!, { target: { value: newValue } });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'fieldName',
            rowKeyValue: 1,
            type: ActionType.UpdateCellValue,
            value: newValue,
        });
    });

    it('should fire CloseEditor on blur', () => {
        const { container } = render(<CellEditorString {...props} />);
        fireEvent.blur(container.querySelector('input')!);

        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            type: ActionType.CloseEditor,
            columnKey: 'fieldName',
            rowKeyValue: 1,
        });
    });
});
