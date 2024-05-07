import CellEditorValidation from './CellEditorValidationMessage';
import { ICellEditorValidationMessageProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: ICellEditorValidationMessageProps = {
    message: '',
} as any;

it('renders without crashing', () => {
    const element = document.createElement('td');
    const root = createRoot(element!);
    root.render(<CellEditorValidation {...props} />);
    root.unmount();
});
