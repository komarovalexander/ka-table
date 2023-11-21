import LoadingDemo from './LoadingDemo';
import React from 'react';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<LoadingDemo />);
    root.unmount();
});
