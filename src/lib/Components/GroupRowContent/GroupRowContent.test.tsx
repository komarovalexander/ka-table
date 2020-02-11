import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { ActionType } from '../../enums';
import GroupRowContent, { IGroupRowProps } from './GroupRowContent';

Enzyme.configure({ adapter: new Adapter() });

const props: IGroupRowProps = {
  column: { key: 'field' },
  contentColSpan: 0,
  dispatch: jest.fn(),
  groupIndex: 0,
  groupKey: ['group'],
  isExpanded: false,
  text: '',
};

describe('GroupRowContent', () => {
  it('renders without crashing', () => {
    const element = document.createElement('tr');
    ReactDOM.render(<GroupRowContent {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

  it('onClick should change groupsExpanded', () => {
    const wrapper = mount(<GroupRowContent {...props} />, {
      attachTo: document.createElement('tr'),
    });
    wrapper.find('.ka-icon-group-arrow').simulate('click');
    expect(props.dispatch).toBeCalledTimes(1);
    expect(props.dispatch).toBeCalledWith(ActionType.UpdateGroupsExpanded, {groupKey: ['group']});
  });

  it('Should render custom group cell', () => {
    const column = {
      groupCell: () => <div className='custom-group-cell'/>,
      key: 'field',
    };
    const wrapper = mount(<GroupRowContent {...props} column={column}/>, {
      attachTo: document.createElement('tr'),
    });
    expect(wrapper.find('.custom-group-cell').length).toBe(1);
  });
});
