import CellEditorValidation from './CellEditorValidationMessage';
import { ICellEditorValidationMessageProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act, render } from '@testing-library/react';

const props: ICellEditorValidationMessageProps = {
    message: '',
} as any;

it('renders without crashing', () => {
    const element = document.createElement('td');
    const root = createRoot(element!);
    act(() => {
        root.render(<CellEditorValidation {...props} />);
    });
    act(() => {
        root.unmount();
    });
});

it('should match validation message', () => {
    const message = 'Age must be greater than 8';
    const { container } = render(<CellEditorValidation message={message} />);
    expect(container.querySelector('.ka-validation-message')!.textContent).toEqual(message);
});
