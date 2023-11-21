import Enzyme, { mount } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import { DataType } from '../../enums';
import GroupRow from './GroupRow';
import { IGroupRowProps } from '../../props';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: IGroupRowProps = {
  childComponents: {},
  column: {
    key: '1',
    field: 'column',
    title: 'Column 1',
    dataType: DataType.String,
  },
  contentColSpan: 2,
  dispatch: jest.fn(),
  groupIndex: 0,
  groupKey: ['group'],
  isExpanded: true,
  text: '',
} as any;

describe('GroupRow', () => {
  it('renders without crashing', () => {
    const element = document.createElement('tbody');
    const root = createRoot(element!);
    root.render(<GroupRow {...props} />);
    root.unmount();
  });

  it('Should render custom group cell', () => {
    const groupRow = () => <td className='custom-group-row' />;
    const wrapper = mount(
      <GroupRow
        {...props}
        childComponents={{
          groupRow: {
            content: groupRow,
          },
        }}
      />,
      {
        attachTo: document.createElement('tbody'),
      }
    );
    expect(wrapper.find('.custom-group-row').length).toBe(1);
  });
});
