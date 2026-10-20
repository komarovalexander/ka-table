import React from 'react';
import SelectionDemo from './SelectionDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<SelectionDemo />);
});
