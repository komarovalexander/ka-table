import Enzyme, { mount } from 'enzyme';

import { ActionType } from '../../enums';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { IPagingIndexProps } from '../../props';
import PagingIndex from './PagingIndex';
import React from 'react';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingIndexProps = {
    childComponents: {},
} as any;

it('renders without crashing', () => {
    const element = document.createElement('div');
    ReactDOM.render(<PagingIndex {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
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
