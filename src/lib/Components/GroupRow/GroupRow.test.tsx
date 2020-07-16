import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { DataType } from '../../enums';
import { IGroupRowProps } from '../GroupRowContent/GroupRowContent';
import GroupRow from './GroupRow';

Enzyme.configure({ adapter: new Adapter() });

const props: IGroupRowProps = {
  childComponents: {},
  column: { key: '1', field: 'column', title: 'Column 1', dataType: DataType.String },
  contentColSpan: 2,
  dispatch: jest.fn(),
  groupIndex: 0,
  groupKey: ['group'],
  isExpanded: true,
  text: '',
};

describe('GroupRow', () => {
  it('renders without crashing', () => {
    const element = document.createElement('tbody');
    ReactDOM.render(<GroupRow {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('Should render custom group cell', () => {
    const groupRow = () => <td className='custom-group-row'/>;
    const wrapper = mount(<GroupRow {...props} groupRow={groupRow}/>, {
      attachTo: document.createElement('tbody'),
    });
    expect(wrapper.find('.custom-group-row').length).toBe(1);
  });
});
