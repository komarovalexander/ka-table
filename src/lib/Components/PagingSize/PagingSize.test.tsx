import Enzyme, { mount } from 'enzyme';

import { ActionType } from '../../enums';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { IPagingSizeProps } from '../../props';
import PagingSize from './PagingSize';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingSizeProps = {
    childComponents: {},
    value: 5,
} as any;

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!);
    root.render(<PagingSize  {...props} />);
    root.unmount();
});
it('should render with custom content', () => {
    const wrapper = mount(
        <PagingSize
            {...props}
            childComponents={{
                pagingSize: { content: () => <>Custom Paging Size</> },
            }}
        />
    );
    expect(wrapper.find('.ka-paging-size').text()).toEqual(
        'Custom Paging Size'
    );
});

it('onClick should dispath UpdatePageSize on click', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<PagingSize {...props} dispatch={dispatch} />);
    wrapper.find('.ka-paging-size').first().simulate('click');
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith({
        pageSize: 5,
        type: ActionType.UpdatePageSize,
    });
});
