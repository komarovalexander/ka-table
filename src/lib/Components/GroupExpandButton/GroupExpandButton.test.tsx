import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import GroupExpandButton from './GroupExpandButton';
import { IGroupRowProps } from '../../props';
import React from 'react';
import ReactDOM from 'react-dom';

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
    ReactDOM.render(<GroupExpandButton {...props} />, element);
    ReactDOM.unmountComponentAtNode(element);
  });

});
