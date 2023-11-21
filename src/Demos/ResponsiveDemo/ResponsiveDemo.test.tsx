import React from 'react';
import ResponsiveDemo from './ResponsiveDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<ResponsiveDemo />);
    root.unmount();
});
