import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import React from 'react';
import { TablePaging } from './TablePaging';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div!);
  root.render(<TablePaging {...props} />);
  root.unmount();
});
