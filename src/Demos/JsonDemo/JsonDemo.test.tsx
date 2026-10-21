import JsonDemo from './JsonDemo';
import React from 'react';
import { render } from '@testing-library/react';

// the demo loads its data when it is mounted, the test doesn't use the network
beforeEach(() => {
    vi.stubGlobal('fetch', () => new Promise(() => {}));
});

it('renders without crashing', () => {
    render(<JsonDemo />);
});
