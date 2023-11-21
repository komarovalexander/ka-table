import React from 'react';
import ValidationDemo from './ValidationDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<ValidationDemo />);
  root.unmount();
});
