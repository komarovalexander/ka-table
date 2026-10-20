import CustomCellDemo from './CustomCellDemo';
import React from 'react';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<CustomCellDemo />);
});
