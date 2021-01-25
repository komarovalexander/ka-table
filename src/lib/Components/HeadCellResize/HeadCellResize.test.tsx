import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import simulant from 'simulant';

import { Column } from '../../Models/Column';
import HeadCellResize from './HeadCellResize';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  column: new Column(),
  dispatch: jest.fn(),
  currentWidth: 100,
};

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<HeadCellResize {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('should handle onMouseDown correctly', () => {
  const wrapper = mount(<HeadCellResize {...props} />);
  const preventDefault = jest.fn();
  wrapper.simulate('mousedown', { preventDefault });
  expect(preventDefault).toBeCalledTimes(1);
  simulant.fire(document.body, 'mouseup');
  expect(props.dispatch).toBeCalledTimes(2);
});
