import React from 'react';
import ResponsiveDemo from './ResponsiveDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<ResponsiveDemo />);
});
