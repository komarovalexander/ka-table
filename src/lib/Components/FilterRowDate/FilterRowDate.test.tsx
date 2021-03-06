import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ActionType, DataType } from '../../enums';
import { IFilterRowEditorProps } from '../CellEditor/CellEditor';
import FilterRowDate from './FilterRowDate';

Enzyme.configure({ adapter: new Adapter() });
const props: IFilterRowEditorProps = {
  column: {
    dataType: DataType.Date,
    key: 'fieldName',
    title: 'Field',
  },
  dispatch: jest.fn(),
};

describe('FliterRowDate', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    ReactDOM.render(<FilterRowDate {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('should fire UpdateFilterRowValue', () => {
    const newValue = new Date(2020, 1, 2);
    const column = { field: 'name', key: 'nameKey', dataType: DataType.Date };
    const wrapper = mount(<FilterRowDate {...props} column={column}/>);

    wrapper.find('input').props().onChange!({currentTarget: { value: newValue} } as any);
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(
      { type: ActionType.UpdateFilterRowValue, filterRowValue: newValue, columnKey: 'nameKey' },
    );
  });
});
