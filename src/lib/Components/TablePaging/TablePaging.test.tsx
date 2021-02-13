import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

import { TablePaging } from './TablePaging';

Enzyme.configure({ adapter: new Adapter() });

const tableProps: any = {
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TablePaging {...tableProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
