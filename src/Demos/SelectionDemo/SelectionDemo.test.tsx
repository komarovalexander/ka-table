import React from 'react';
import SelectionDemo from './SelectionDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<SelectionDemo />);
  root.unmount();
});
