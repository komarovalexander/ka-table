import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import simulant from 'simulant';

import HeadCellResize from './HeadCellResize';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  column: { key: 'column1'},
  dispatch: jest.fn(),
  currentWidth: 100,
  childComponents: {}
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

it('should use parentWidth for resizing', () => {
  const wrapper = shallow(<HeadCellResize {...props} currentWidth={'20%'} />);
  wrapper.simulate('mousedown', { preventDefault: () => {}, screenX: 80, currentTarget: { parentElement : { offsetWidth: 80 } } });
  simulant.fire(document.body, 'mouseup', { screenX: 90 });
  expect(props.dispatch.mock.calls[0]).toEqual([{columnKey: 'column1', type: 'ResizeColumn', width: 90}]);
});

it('should use currentWidth for resizing', () => {
  const wrapper = shallow(<HeadCellResize {...props} />);
  wrapper.simulate('mousedown', { preventDefault: () => {}, screenX: 150 });
  simulant.fire(document.body, 'mouseup', { screenX: 160 });
  expect(props.dispatch.mock.calls[0]).toEqual([{columnKey: 'column1', type: 'ResizeColumn', width: 110}]);
});
