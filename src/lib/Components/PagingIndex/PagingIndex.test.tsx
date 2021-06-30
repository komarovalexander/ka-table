import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ActionType } from '../../enums';
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

it('onClick should dispath UpdatePageIndex on click', () => {
  const dispatch = jest.fn();
  const wrapper = mount(<PagingIndex {...props} pageIndex={2} dispatch={dispatch} />);
  wrapper.find('.ka-paging-page-index').first().simulate('click');
  expect(dispatch).toBeCalledTimes(1);
  expect(dispatch).toBeCalledWith({
    pageIndex: 2,
    type: ActionType.UpdatePageIndex,
  });
});
