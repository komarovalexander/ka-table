import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { ActionType } from '../../enums';
import { IPagingPagesProps } from '../../props';
import PagingPages from './PagingPages';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingPagesProps = {
    pages: [1, 2, 3],
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
  ReactDOM.render(<PagingPages {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
  expect(props.dispatch).toHaveBeenCalledTimes(0);
});

it('set page index as 0 in case it out of the pages lenght', () => {
  mount(<PagingPages {...props} pageIndex={3} />);
  expect(props.dispatch).toBeCalledWith({
    pageIndex: 0,
    type: ActionType.UpdatePageIndex,
  });
});
it('dont set page index as 0 in case it inside of the pages lenght', () => {
  mount(<PagingPages {...props} pageIndex={2} />);
  expect(props.dispatch).toHaveBeenCalledTimes(0);
});
it('dont set page index as 0 in case it equals 0 and pages is empty', () => {
  mount(<PagingPages {...props} pages={[]} pageIndex={0} />);
  expect(props.dispatch).toHaveBeenCalledTimes(0);
});

it('should not throw the warning', () => {
  const error = jest.spyOn(global.console, 'error');
  const ParentComponent = () => {
    const [state, change] = useState(100);
    return (
      <PagingPages {...props} dispatch={(action) => {
        change(action.pageIndex);
      }} pages={[]} pageIndex={state} />
    );
  }
  mount(<ParentComponent />);
  expect(error).not.toHaveBeenCalled();
  // Cleanup
  error.mockReset();
  error.mockRestore();
});
