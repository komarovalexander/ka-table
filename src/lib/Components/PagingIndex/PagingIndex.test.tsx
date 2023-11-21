import Enzyme, { mount } from 'enzyme';

import { ActionType } from '../../enums';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { IPagingIndexProps } from '../../props';
import PagingIndex from './PagingIndex';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingIndexProps = {
    childComponents: {},
} as any;

it('renders without crashing', () => {
    const element = document.createElement('div');
    const root = createRoot(element!);
    root.render(<PagingIndex  {...props} />);
    root.unmount();
});

it('onClick should dispath UpdatePageIndex on click', () => {
    const dispatch = jest.fn();
    const wrapper = mount(
        <PagingIndex {...props} pageIndex={2} dispatch={dispatch} />
    );
    wrapper.find('.ka-paging-page-index').first().simulate('click');
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith({
        pageIndex: 2,
        type: ActionType.UpdatePageIndex,
    });
});
