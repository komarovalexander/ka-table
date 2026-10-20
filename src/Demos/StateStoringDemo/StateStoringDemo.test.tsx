import React from 'react';
import StateStoringDemo from './StateStoringDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<StateStoringDemo />);
});
