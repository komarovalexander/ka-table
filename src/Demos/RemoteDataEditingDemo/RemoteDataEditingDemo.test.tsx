import React from 'react';
import RemoteDataEditingDemo from './RemoteDataEditingDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div!);
    root.render(<RemoteDataEditingDemo />);
    root.unmount();
});
