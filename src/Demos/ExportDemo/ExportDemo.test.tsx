import React from 'react';
import ReactDOM from 'react-dom';

import ExportDemo from './ExportDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExportDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
