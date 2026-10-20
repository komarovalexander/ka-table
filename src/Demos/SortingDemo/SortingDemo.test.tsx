import React from 'react';
import SortingDemo from './SortingDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<SortingDemo />);
});
