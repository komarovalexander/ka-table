import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, DataType } from '../../enums';
import FilterRowNumber from './FilterRowNumber';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
  column: {
    dataType: DataType.String,
    key: 'columnField',
    title: 'Field',
  },
  dispatch: jest.fn(),
  rowData: { column: 1 },
};

describe('FilterRowNumber', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<FilterRowNumber {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should fire FilterRowChanged', () => {
    const newValue = 2;
    const column = { field: 'name', key: 'nameKey', dataType: DataType.Number };
    const wrapper = mount(<FilterRowNumber {...props} column={column} />);

    wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      ActionType.ChangeFilterRow, { column: { ...column, filterRowValue: newValue } },
    );
  });
});
