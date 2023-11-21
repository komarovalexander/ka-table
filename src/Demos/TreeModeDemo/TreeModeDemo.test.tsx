import React from 'react';
import TreeModeDemo from './TreeModeDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<TreeModeDemo />);
    root.unmount();
});
