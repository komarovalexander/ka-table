import React from 'react';
import ReactDOM from 'react-dom';

import ExportToPdfDemo from './ExportToPdfDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExportToPdfDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
