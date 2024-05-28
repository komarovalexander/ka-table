import Enzyme, { mount } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

import CellEditorValidation from './CellEditorValidationMessage';
import { ICellEditorValidationMessageProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';


Enzyme.configure({ adapter: new Adapter() });

const props: ICellEditorValidationMessageProps = {
    message: '',
} as any;

it('renders without crashing', () => {
    const element = document.createElement('td');
    const root = createRoot(element!);
    root.render(<CellEditorValidation {...props} />);
    root.unmount();
});

it('should match validation message', () => {
    const message = 'Age must be greater than 8';
    const wrapper = mount(<CellEditorValidation message={message} />);
    const container = wrapper.find('.ka-validation-message');
    expect(container.text()).toEqual(message);
});
