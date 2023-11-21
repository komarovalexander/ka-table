import Enzyme, { shallow } from 'enzyme';

import Adapter from '@cfaester/enzyme-adapter-react-18';
import { ColGroup } from './ColGroup';
import React from 'react';
import { createRoot } from 'react-dom/client';

Enzyme.configure({ adapter: new Adapter() });

const props: any = {
  columns: [
    { key: 'column', width: 100 },
    { key: 'column2' },
  ]
};

describe('ColGroup', () => {
  it('renders without crashing', () => {
    const div = document.createElement('table');
    const root = createRoot(div!);
  root.render(<ColGroup {...props} />);
    root.unmount();
  });
})
