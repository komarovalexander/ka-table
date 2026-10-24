import { ActionType, DataType, EditingMode } from '../../enums';
import { act, fireEvent, render } from '@testing-library/react';

import CellEditorBoolean from './CellEditorBoolean';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: ICellEditorProps = {
    column: {
        dataType: DataType.String,
        key: 'fieldName',
        title: 'Field',
    },
    dispatch: vi.fn(),
    editingMode: EditingMode.None,
    field: 'fieldName',
    isDetailsRowShown: false,
    isSelectedRow: false,
    rowData: { fieldName: 'columnFieldValue', id: 2 },
    rowKeyField: 'id',
    rowKeyValue: 2,
    selectedRows: [],
    value: 'columnFieldValue',
};

beforeEach(() => {
    vi.clearAllMocks();
});

describe('CellEditorBoolean', () => {
    it('renders without crashing', () => {
        const element = document.createElement('td');
        const root = createRoot(element!);
        act(() => {
            root.render(<CellEditorBoolean {...props} />);
        });
        act(() => {
            root.unmount();
        });
    });

    it('should dispatch RowDataChanged', () => {
        const { container } = render(<CellEditorBoolean {...props} />);

        // the value is truthy, so the checkbox is checked and a click unchecks it
        fireEvent.click(container.querySelector('input')!);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            columnKey: 'fieldName',
            rowKeyValue: 2,
            type: ActionType.UpdateCellValue,
            value: false,
        });
    });

    it('should dispatch CloseEditor', () => {
        const { container } = render(<CellEditorBoolean {...props} />);

        fireEvent.blur(container.querySelector('input')!);
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.dispatch).toHaveBeenCalledWith({
            type: ActionType.CloseEditor,
            columnKey: 'fieldName',
            rowKeyValue: 2,
        });
    });
});
