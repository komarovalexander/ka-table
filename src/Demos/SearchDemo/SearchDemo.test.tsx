import React from 'react';
import SearchDemo from './SearchDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<SearchDemo />);
    root.unmount();
});
