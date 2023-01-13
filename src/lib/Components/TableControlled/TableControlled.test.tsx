import Enzyme, { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { TableControlled } from './TableControlled';

Enzyme.configure({ adapter: new Adapter() });

const tableProps: any = {
  columns: [
    { key: 'column', name: 'Column 1' },
    { key: 'column2', name: 'Column 2' },
  ],
  data: [
    { column: 1, column2: 2, id: 1 },
    { column: 12, column2: 22, id: 2 },
  ],
  dispatch: jest.fn(),
  rowKeyField: 'id',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableControlled {...tableProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
