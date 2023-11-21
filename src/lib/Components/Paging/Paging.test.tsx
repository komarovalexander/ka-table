import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import { IPagingProps } from '../../props';
import Paging from './Paging';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingProps = {
    childComponents: {},
    enabled: true,
    pageIndex: 1,
    pageSize: 2,
    pagesCount: 2,
} as any;

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!); 
    root.render(<Paging  {...props} />);
    root.unmount();
});
it('should be rendered with PagingSizes', () => {
    const wrapper = mount(<Paging {...props} pageSizes={[5, 10, 15]} />);
    expect(wrapper.find('.ka-paging-sizes').exists()).toBeTruthy();
});
it('should be rendered without PagingSizes', () => {
    const wrapper = mount(<Paging {...props} pageSizes={undefined} />);
    expect(wrapper.find('.ka-paging-sizes').exists()).toBeFalsy();
});
it('should render with custom content', () => {
    const wrapper = mount(
        <Paging
            {...props}
            childComponents={{ paging: { content: () => <>Custom Paging</> } }}
        />
    );
    expect(wrapper.find('.ka-paging').text()).toEqual('Custom Paging');
});
