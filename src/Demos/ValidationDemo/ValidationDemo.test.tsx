import React from 'react';
import ValidationDemo from './ValidationDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<ValidationDemo />);
});
