import React from 'react';
import ReactDOM from 'react-dom';

import ColumnChooserDemo from './RowsReorderingDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ColumnChooserDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
