import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { Events } from '../../enums';
import FilterCell from '../FilterCell/FilterCell';
import FilterRow, { IFilterRowProps } from './FilterRow';

Enzyme.configure({ adapter: new Adapter() });

let props: IFilterRowProps;

beforeEach(() => {
  props = {
    columns: [],
    dispatch: jest.fn(),
    groupColumnsCount: 0,
  };
});

it('renders without crashing', () => {
  const element = document.createElement('tbody');
  ReactDOM.render(<FilterRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('should pass field name to filterCellValueChangeHandler', () => {
  const newValue = 2;
  const column = { field: 'name', key: 'nameKey' };
  const wrapper = mount(
    <FilterRow {...props} columns={[column]} />,
    {
      attachTo: document.createElement('thead'),
    },
  );
  wrapper.find(FilterCell).last().prop('onValueChange')(newValue);

  expect(props.dispatch).toBeCalledTimes(1);
  expect(props.dispatch).toBeCalledWith(
    Events.FilterRowChanged, { column: { field: 'name', key: 'nameKey', filterRowValue: newValue } },
  );
});
