import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import PagingIndex, { IPagingIndexProps } from './PagingIndex';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingIndexProps = {
  childComponents: {},
};

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<PagingIndex {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
