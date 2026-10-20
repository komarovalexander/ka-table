import React from 'react';
import SearchDemo from './SearchDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<SearchDemo />);
});
