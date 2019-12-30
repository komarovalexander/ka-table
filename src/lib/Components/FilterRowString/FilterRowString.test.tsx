import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { DataType, Events } from '../../enums';
import FilterRowString from './FilterRowString';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: jest.fn(),
  isSelectedRow: true,
  rowData: { column: 1 },
  rowKeyField: '',
};

describe('FilterRowString', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<FilterRowString {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('FilterRowString: should pass field name to filterCellValueChangeHandler', () => {
    const newValue = '2';
    const column = { field: 'name', key: 'nameKey' };
    const wrapper = mount(<FilterRowString {...props} column={column} />);

    wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      Events.FilterRowChanged, { column: { field: 'name', key: 'nameKey', filterRowValue: newValue } },
    );
  });
});
