import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import emptyFunc from '../../emptyFunc';
import * as filterUtils from '../../Utils/FilterUtils';
import FilterCell from '../FilterCell/FilterCell';
import FilterRow, { IFilterRowProps } from './FilterRow';

jest.mock('../../Utils/FilterUtils', () => ({
  filterCellValueChangeHandler: jest.fn(),
}));
Enzyme.configure({ adapter: new Adapter() });

const props: IFilterRowProps = {
  columns: [],
  filterRow: [{
    field: 'name',
    operator: '=',
    value: 'Billi Bob',
  }],
  groupColumnsCount: 0,
  onOptionChange: emptyFunc,
};

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<FilterRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('should pass field name to filterCellValueChangeHandler', () => {
  const filterCellValueChangeHandler = filterUtils.filterCellValueChangeHandler;
  const newValue = 2;
  const wrapper = mount(
    <FilterRow {...props} columns={[{ field: 'name', key: 'nameKey' }]} />,
    {
      attachTo: document.createElement('thead'),
    },
  );
  wrapper.find(FilterCell).last().prop('onValueChange')(newValue);

  expect(filterCellValueChangeHandler).toBeCalledTimes(1);
  expect(filterCellValueChangeHandler).toBeCalledWith(newValue, 'name', props.filterRow, expect.any(Function));
});
