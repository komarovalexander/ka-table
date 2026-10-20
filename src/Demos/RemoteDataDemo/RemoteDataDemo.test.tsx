import React from 'react';
import RemoteDataDemo from './RemoteDataDemo';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<RemoteDataDemo />);
});
