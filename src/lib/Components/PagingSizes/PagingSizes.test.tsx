import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import { IPagingProps } from '../../props';
import PagingSizes from './PagingSizes';
import React from 'react';
import { createRoot } from 'react-dom/client';

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
  const root = createRoot(element!); 
  root.render(<PagingSizes  {...props} />);
  root.unmount();
  expect(props.dispatch).toHaveBeenCalledTimes(0);
});
it('should be rendered without PagingSizes', () => {
  const wrapper = mount(<PagingSizes {...props} childComponents={{ pagingSizes: { content: () => (<>Custom Paging Sizes</>) }}} />);
  expect(wrapper.find('.ka-paging-sizes').text()).toEqual('Custom Paging Sizes');
});

