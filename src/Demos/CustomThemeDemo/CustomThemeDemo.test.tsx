import React from 'react';
import ReactDOM from 'react-dom';

import CustomThemeDemo from './CustomThemeDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomThemeDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
