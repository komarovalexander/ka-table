import React from 'react';
import StateStoringDemo from './StateStoringDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<StateStoringDemo />);
  root.unmount();
});
