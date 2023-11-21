import React from 'react';
import SelectionSingleDemo from './SelectionSingleDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<SelectionSingleDemo />);
    root.unmount();
});
