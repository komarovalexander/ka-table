import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ActionType } from '../../enums';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import GroupRowContent, { IGroupRowProps } from './GroupRowContent';

Enzyme.configure({ adapter: new Adapter() });

const props: IGroupRowProps = {
  childComponents: {},
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
    expect(props.dispatch).toBeCalledWith({
      groupKey: ['group'],
      type: ActionType.UpdateGroupsExpanded,
    });
  });

  it('Should render custom group cell', () => {
    const column: Column = {
      key: 'field',
    };
    const childComponents: ChildComponents = {
      groupCell: {
        content: () => <div className='custom-group-cell'/>,
      }
    };
    const wrapper = mount(<GroupRowContent {...props} childComponents={childComponents} column={column}/>, {
      attachTo: document.createElement('tr'),
    });
    expect(wrapper.find('.custom-group-cell').length).toBe(1);
  });
});
