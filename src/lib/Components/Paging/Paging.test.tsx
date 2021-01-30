import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { IPagingProps } from '../../props';
import Paging from './Paging';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingProps = {
    childComponents: {},
    enabled: true,
    pageIndex: 1,
    pageSize: 2,
    pagesCount: 2
};

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<Paging {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});
it('should be rendered with PagingSizes', () => {
  const wrapper = mount(<Paging {...props} pageSizes={[5, 10, 15]}/>);
  expect(wrapper.find('.ka-paging-sizes').exists()).toBeTruthy();
});
it('should be rendered without PagingSizes', () => {
  const wrapper = mount(<Paging {...props} pageSizes={undefined}/>);
  expect(wrapper.find('.ka-paging-sizes').exists()).toBeFalsy();
});
it('should render with custom content', () => {
  const wrapper = mount(<Paging {...props} childComponents={{ paging: { content: () => (<>Custom Paging</>) }}} />);
  expect(wrapper.find('.ka-paging').text()).toEqual('Custom Paging');
});
