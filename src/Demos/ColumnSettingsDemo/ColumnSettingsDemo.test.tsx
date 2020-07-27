import React from 'react';
import ReactDOM from 'react-dom';

import ColumnSettingsDemo from './ColumnSettingsDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ColumnSettingsDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
