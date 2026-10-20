import EventsDemo from './EventsDemo';
import React from 'react';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<EventsDemo />);
});
