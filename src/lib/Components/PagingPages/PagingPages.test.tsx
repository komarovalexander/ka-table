import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ActionType } from '../../enums';
import { IPagingProps } from '../../props';
import PagingPages from './PagingPages';

Enzyme.configure({ adapter: new Adapter() });

const props: IPagingProps = {
    pageSize: 2,
    pageIndex: 2,
    pagesCount: 3,
    enabled: true,
    dispatch: jest.fn(),
    childComponents: {}
};

describe('PagingPages', () => {
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
    mount(<PagingPages {...props} pageIndex={0} />);
    expect(props.dispatch).toHaveBeenCalledTimes(0);
  });
});
