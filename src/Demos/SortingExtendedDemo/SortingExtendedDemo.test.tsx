import React from 'react';
import SortingExtendedDemo from './SortingExtendedDemo';
import { createRoot } from 'react-dom/client';
it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<SortingExtendedDemo />);
    root.unmount();
});
