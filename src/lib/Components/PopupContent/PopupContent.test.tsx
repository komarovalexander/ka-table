import React from 'react';
import ReactDOM from 'react-dom';

import PopupContent from './PopupContent';

const props: any = {
  column: {key: 'field'},
  childComponents: {},
  dispatch: () => {},
  data: [{ feild: 1 }]
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopupContent {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
