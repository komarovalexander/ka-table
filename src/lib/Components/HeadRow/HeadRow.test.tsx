import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { DataType } from '../../enums';
import HeaderRow from './HeadRow';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
  childComponents: {},
  columns: [
    { key: 'column', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
  ],
};

it('renders without crashing', () => {
  const element = document.createElement('thead');
  ReactDOM.render(<HeaderRow {...props} />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('should handle onMouseDown correctly', () => {
  const wrapper = mount((
    <HeaderRow {...props} childComponents={{
      headRow: {
        content: () => <td>Custom</td>
      }
    }} />
  ), {
    attachTo: document.createElement('thead')
  });
  expect(wrapper.find('td').text()).toBe('Custom');
});

