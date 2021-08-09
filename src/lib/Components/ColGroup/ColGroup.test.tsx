import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ColGroup } from './ColGroup';

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
    ReactDOM.render(<ColGroup {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
