import React from 'react';
import ReactDOM from 'react-dom';

import EventsDemo from './EventsDemo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventsDemo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
