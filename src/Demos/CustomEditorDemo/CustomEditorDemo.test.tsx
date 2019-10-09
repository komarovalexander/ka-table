import React from 'react';
import ReactDOM from 'react-dom';

import CustomEditorDemo from './CustomEditorDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomEditorDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
