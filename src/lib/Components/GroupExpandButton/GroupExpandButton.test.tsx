import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import GroupExpandButton from './GroupExpandButton';
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

describe('GroupRowExpandButton', () => {
  it('renders without crashing', () => {
    const element = document.createElement('td');
    const root = createRoot(element!);
    root.render(<GroupExpandButton {...props} />);
    root.unmount();
  });

});
