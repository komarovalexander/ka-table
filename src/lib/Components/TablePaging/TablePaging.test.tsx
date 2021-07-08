import Enzyme from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { TablePaging } from './TablePaging';

Enzyme.configure({ adapter: new Adapter() });

const tableProps: any = {
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TablePaging {...tableProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
