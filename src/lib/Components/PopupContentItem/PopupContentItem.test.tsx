import React from 'react';
import ReactDOM from 'react-dom';

import PopupContentItem from './PopupContentItem';

const props: any = {
  column: {key: 'field'},
  childComponents: {},
  dispatch: () => {},
  item: ''
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopupContentItem {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
