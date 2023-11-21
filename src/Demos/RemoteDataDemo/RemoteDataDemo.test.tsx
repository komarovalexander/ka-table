import React from 'react';
import RemoteDataDemo from './RemoteDataDemo';
import { createRoot } from 'react-dom/client';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<RemoteDataDemo />);
  root.unmount();
});
