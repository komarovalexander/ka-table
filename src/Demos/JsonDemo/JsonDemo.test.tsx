import JsonDemo from './JsonDemo';
import React from 'react';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<JsonDemo />);
});
