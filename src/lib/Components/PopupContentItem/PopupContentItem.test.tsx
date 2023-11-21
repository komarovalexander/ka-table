import PopupContentItem from './PopupContentItem';
import React from 'react';
import { createRoot } from 'react-dom/client';

const props: any = {
  column: {key: 'field'},
  childComponents: {},
  dispatch: () => {},
  item: ''
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<PopupContentItem {...props} />);
  root.unmount();
});
