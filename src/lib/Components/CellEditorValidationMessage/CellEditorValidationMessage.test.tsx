import CellEditorValidation from './CellEditorValidationMessage';
import { ICellEditorValidationMessageProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

const props: ICellEditorValidationMessageProps = {
    message: '',
} as any;

it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<CellEditorValidation {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
});
