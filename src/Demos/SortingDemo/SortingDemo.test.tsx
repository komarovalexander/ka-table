import React from 'react';
import SortingDemo from './SortingDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<SortingDemo />);
  root.unmount();
});
