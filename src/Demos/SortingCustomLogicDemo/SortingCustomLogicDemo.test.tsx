import React from 'react';
import SortingCustomLogicDemo from './SortingCustomLogicDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<SortingCustomLogicDemo />);
    root.unmount();
});
