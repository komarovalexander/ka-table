import React from 'react';
import ReactDOM from 'react-dom';
import SortingExtendedDemo from './SortingExtendedDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SortingExtendedDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
