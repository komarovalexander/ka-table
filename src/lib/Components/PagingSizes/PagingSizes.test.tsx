import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { IPagingProps } from '../../props';
import PagingSizes from './PagingSizes';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingProps = {
    pageSize: 2,
    pageIndex: 2,
    enabled: true,
    dispatch: jest.fn(),
    childComponents: {}
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<PagingSizes {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
  expect(props.dispatch).toHaveBeenCalledTimes(0);
});
it('should be rendered without PagingSizes', () => {
  const wrapper = mount(<PagingSizes {...props} childComponents={{ pagingSizes: { content: () => (<>Custom Paging Sizes</>) }}} />);
  expect(wrapper.find('.ka-paging-sizes').text()).toEqual('Custom Paging Sizes');
});

