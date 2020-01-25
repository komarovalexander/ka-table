import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType, DataType } from '../../enums';
import GroupRow, { IGroupRowProps } from './GroupRow';

Enzyme.configure({ adapter: new Adapter() });

const props: IGroupRowProps = {
  columns: [
    { key: '1', field: 'column', title: 'Column 1', dataType: DataType.String },
    { key: '2', field: 'column2', title: 'Column 2', dataType: DataType.String  },
  ],
  dispatch: jest.fn(),
  emptyColumnsCount: 0,
  groupRowData: { key: ['group'], groupMark: {}, value: 123 },
  groupedColumns: [],
  groups: [],
  groupsExpanded: [],
};

describe('GroupRow', () => {
  it('renders without crashing', () => {
    const element = document.createElement('tbody');
    ReactDOM.render(<GroupRow {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('onClick should change groupsExpanded', () => {
    const wrapper = mount(<GroupRow {...props} />, {
      attachTo: document.createElement('tbody'),
    });
    wrapper.find('.ka-icon-group-arrow').simulate('click');
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(ActionType.UpdateGroupsExpanded, {newValue: {groupsExpanded: [['group']]}});
  });
});
