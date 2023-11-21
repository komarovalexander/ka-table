import React from 'react';
import RowReorderingDemo from './RowReorderingDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<RowReorderingDemo />);
  root.unmount();
});
