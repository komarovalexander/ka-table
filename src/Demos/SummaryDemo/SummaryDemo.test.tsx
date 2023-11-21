import React from 'react';
import SummaryDemo from './SummaryDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<SummaryDemo />);
    root.unmount();
});
