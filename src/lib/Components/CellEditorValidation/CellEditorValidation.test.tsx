import { DataType, EditingMode } from '../../enums';

import CellEditorValidation from './CellEditorValidation';
import { ICellEditorProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from '@testing-library/react';

const props: ICellEditorProps = {
    column: {
        dataType: DataType.String,
        key: 'column',
        title: 'Field',
    },
    dispatch: () => {},
    editingMode: EditingMode.None,
    field: 'column',
    isDetailsRowShown: false,
    isSelectedRow: true,
    rowData: [{ column: 12, id: 1 }],
    rowKeyField: 'id',
    rowKeyValue: 1,
    selectedRows: [],
    value: 12,
};

it('renders without crashing', () => {
    const element = document.createElement('td');
    const root = createRoot(element!);
    root.render(<CellEditorValidation {...props} />);
    root.unmount();
});

describe('the validation message for the assistive technologies', () => {
    it('describes the editor and is announced', () => {
        const { container } = render(<CellEditorValidation {...props} validationMessage='Required' />);
        const input = container.querySelector('input')!;
        const message = container.querySelector('.ka-validation-message')!;
        expect(input.getAttribute('aria-invalid')).toBe('true');
        expect(message.getAttribute('role')).toBe('alert');
        expect(message.id).not.toBe('');
        expect(input.getAttribute('aria-describedby')).toBe(message.id);
    });
    it('is not referred to without a message', () => {
        const { container } = render(<CellEditorValidation {...props} />);
        const input = container.querySelector('input')!;
        expect(input.getAttribute('aria-invalid')).toBeNull();
        expect(input.getAttribute('aria-describedby')).toBeNull();
    });
    it('has a unique id in every editor', () => {
        const { container } = render(<><CellEditorValidation {...props} validationMessage='a' /><CellEditorValidation {...props} validationMessage='b' /></>);
        const ids = Array.from(container.querySelectorAll('.ka-validation-message')).map((message) => message.id);
        expect(new Set(ids).size).toBe(2);
    });
});
