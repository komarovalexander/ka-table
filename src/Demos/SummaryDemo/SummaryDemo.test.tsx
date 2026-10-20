import React from 'react';
import SummaryDemo from './SummaryDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<SummaryDemo />);
});
