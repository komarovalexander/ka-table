import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { IPagingIndexProps } from '../../props';
import PagingSize from './PagingSize';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingIndexProps = {
  childComponents: {},
};

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<PagingSize {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
