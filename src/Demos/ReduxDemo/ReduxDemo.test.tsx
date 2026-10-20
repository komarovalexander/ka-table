import React from 'react';
import ReduxDemo from './ReduxDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<ReduxDemo />);
});
