import React from 'react';
import ReactDOM from 'react-dom';

import FilterRowCustomEditorDemo from './FilterRowCustomEditorDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterRowCustomEditorDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
