import Enzyme, { mount } from 'enzyme';

import { ActionType } from '../../enums';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { ChildComponents } from '../../Models/ChildComponents';
import { Column } from '../../Models/Column';
import GroupRowContent from './GroupRowContent';
import { IGroupRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

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
    const root = createRoot(element!);
    root.render(<GroupRowContent {...props} />);
    root.unmount();
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
        content: () => <div className='custom-group-cell' />,
      },
    };
    const wrapper = mount(
      <GroupRowContent
        {...props}
        childComponents={childComponents}
        column={column}
      />,
      {
        attachTo: document.createElement('tr'),
      }
    );
    expect(wrapper.find('.custom-group-cell').length).toBe(1);
  });
});
