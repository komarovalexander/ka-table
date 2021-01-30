import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { IPagingSizeProps } from '../../props';
import PagingSize from './PagingSize';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingSizeProps = {
  childComponents: {},
  value: 1
};

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<PagingSize {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
it('should render with custom content', () => {
  const wrapper = mount(<PagingSize {...props} childComponents={{ pagingSize: { content: () => (<>Custom Paging Size</>) }}} />);
  expect(wrapper.find('.ka-paging-size').text()).toEqual('Custom Paging Size');
});
