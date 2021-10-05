import React from 'react';
import ReactDOM from 'react-dom';

import Popup from './Popup';

const props: any = {
  column: {key: 'field'},
  childComponents: {},
  dispatch: () => {},
  data: [{ feild: 1 }]
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Popup {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
